/**
 * Google Apps Script to create the requested Marketing folder structure
 * inside a Shared Drive named "Marketing".
 *
 * How to use:
 * 1) Open https://script.new (Apps Script standalone project)
 * 2) Services (left sidebar) → Enable Advanced Google Services → Drive API (v2) ON
 * 3) In Apps Script: Project Settings → Google Cloud Platform (GCP) project →
 *    open, then in GCP enable the Drive API if prompted
 * 4) Paste this entire file into the editor and set TEMA/SEGMENTO in run()
 * 5) Run the run() function. Approve permissions when asked.
 */

var SHARED_DRIVE_NAME = 'Marketing';

function run() {
  // TODO: Ajuste os valores abaixo antes de executar
  var tema = 'TEMA_AQUI';
  var segmento = 'SEGMENTO_AQUI';
  createMarketingFolders(tema, segmento);
}

function createMarketingFolders(tema, segmento) {
  if (!tema || !segmento) {
    throw new Error('Informe valores válidos para tema e segmento.');
  }
  var driveId = getSharedDriveIdByName(SHARED_DRIVE_NAME);
  if (!driveId) {
    throw new Error('Shared Drive "' + SHARED_DRIVE_NAME + '" não encontrado.');
  }

  var topFolderName = '01_' + tema + ' __ 02_' + segmento;
  var topId = createFolder(topFolderName, driveId);

  var briefingId = createFolder('00_BRIEFING_DO_TEMA', topId);
  var educativoId = createFolder('01_Educativo', topId);
  var tecnicoId = createFolder('02_Tecnico_Educativo', topId);
  var vendaId = createFolder('03_Venda', topId);

  ['01_Roteiros', '02_Brutos', '03_Editados'].forEach(function (sub) {
    createFolder(sub, educativoId);
    createFolder(sub, tecnicoId);
    createFolder(sub, vendaId);
  });

  createTextFile('01_Dor_Principal.md', templateDorPrincipal(tema, segmento), briefingId);
  createTextFile('02_Contexto_e_Timing.md', templateContextoTiming(tema, segmento), briefingId);
  createTextFile('03_Objetivo_do_Conteudo.md', templateObjetivoConteudo(tema, segmento), briefingId);

  Logger.log('Concluído. Pasta criada: https://drive.google.com/drive/folders/' + topId);
}

function createFolder(name, parentId) {
  var resource = {
    title: name,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [{ id: parentId }]
  };
  var folder = Drive.Files.insert(resource, null, {
    supportsTeamDrives: true // required for Shared Drives on v2
  });
  return folder.id;
}

function createTextFile(name, content, parentId) {
  var metadata = {
    title: name,
    mimeType: 'text/plain',
    parents: [{ id: parentId }]
  };
  var blob = Utilities.newBlob(content, 'text/plain', name);
  var file = Drive.Files.insert(metadata, blob, {
    supportsTeamDrives: true
  });
  return file.id;
}

function getSharedDriveIdByName(driveName) {
  var pageToken;
  do {
    var res = Drive.Teamdrives.list({
      q: "name = '" + driveName.replace(/'/g, "\\'") + "'",
      maxResults: 100,
      pageToken: pageToken
    });
    if (res.items && res.items.length) {
      for (var i = 0; i < res.items.length; i++) {
        if (res.items[i].name === driveName) {
          return res.items[i].id; // Root folder ID equals the Team Drive ID
        }
      }
    }
    pageToken = res.nextPageToken;
  } while (pageToken);
  return null;
}

function templateDorPrincipal(tema, segmento) {
  return (
    '# Dor Principal\n' +
    '\n' +
    '- Tema: ' + tema + '\n' +
    '- Segmento: ' + segmento + '\n' +
    '\n' +
    'Descreva a principal dor/problema que este conteúdo aborda.\n' +
    '\n' +
    'Pontos a cobrir:\n' +
    '- Sintomas mais comuns\n' +
    '- Impacto para o público-alvo\n' +
    '- Consequências de não agir\n'
  );
}

function templateContextoTiming(tema, segmento) {
  return (
    '# Contexto e Timing\n' +
    '\n' +
    '- Tema: ' + tema + '\n' +
    '- Segmento: ' + segmento + '\n' +
    '\n' +
    'Explique o contexto atual e o porquê deste conteúdo agora.\n' +
    '\n' +
    'Inclua:\n' +
    '- Sazonalidade / janelas de oportunidade\n' +
    '- Cenário de mercado / mudanças regulatórias\n' +
    '- Eventos ou marcos que puxam a demanda\n'
  );
}

function templateObjetivoConteudo(tema, segmento) {
  return (
    '# Objetivo do Conteúdo\n' +
    '\n' +
    '- Tema: ' + tema + '\n' +
    '- Segmento: ' + segmento + '\n' +
    '\n' +
    'Defina o que o conteúdo deve alcançar.\n' +
    '\n' +
    'KPIs e critérios de sucesso (exemplos):\n' +
    '- Alcance / Visualizações\n' +
    '- Engajamento (CTR, retenção, comentários)\n' +
    '- Leads / Conversões\n'
  );
}