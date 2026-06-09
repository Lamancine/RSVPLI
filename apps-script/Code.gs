const SPREADSHEET_ID = '13T7-cnVE6zIwxA_CvRZfSbrjmHDYw09UYG1ay6UF4Yg';
const VALID_TOKEN = 'vf3a9c6d2b8e14f7a9c3d5e6f1a2b4c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4';
const CONTENT_SHEET_NAME = 'CONTENT';

function savePublishedContent(content) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONTENT_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONTENT_SHEET_NAME);
  }

  const jsonString = JSON.stringify(content);
  sheet.getRange(1, 1).setValue(jsonString);
  sheet.getRange(1, 2).setValue(new Date());
}

function loadPublishedContent() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONTENT_SHEET_NAME);
  if (!sheet) {
    return null;
  }

  const raw = sheet.getRange(1, 1).getValue();
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('Unable to parse published content JSON:', error);
    return null;
  }
}

function doGet(e) {
  const publishedContent = loadPublishedContent();
  if (!publishedContent) {
    return jsonResponse({ status: 'error', message: 'No published content available' }, 404);
  }

  return jsonResponse({ status: 'success', content: publishedContent });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ status: 'error', message: 'No POST data received' }, 400);
    }

    let payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return jsonResponse({ status: 'error', message: 'Invalid JSON payload' }, 400);
    }

    if (payload.token !== VALID_TOKEN) {
      return jsonResponse({ status: 'error', message: 'Invalid API token' }, 401);
    }

    if (payload.type === 'content') {
      if (!payload.content) {
        return jsonResponse({ status: 'error', message: 'Content payload missing' }, 400);
      }

      savePublishedContent(payload.content);
      return jsonResponse({ status: 'success', message: 'Content published' });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheetName = payload.sheetName || 'RSVP';
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Header contains both family-collapsed columns (Guest1/Guest2...) and per-guest columns
    const headerRow = [
      'Timestamp','Code','Attending','FamilySize',
      'Guest1Name','Guest1Brunch','Guest1Shuttle','Guest1Email','Guest1MainCourse','Guest1Languages','Guest1Diet',
      'Guest2Name','Guest2Brunch','Guest2Shuttle','Guest2Email','Guest2MainCourse','Guest2Languages','Guest2Diet',
      'GuestIndex','GuestName','Brunch','Shuttle','Email','MainCourse','MainCourseTick','Languages','Diet','Message','LanguageUI'
    ];

    const existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn() || headerRow.length).getValues()[0];
    const needsHeader = !existingHeaders || !existingHeaders[0] || headerRow.some((col, idx) => existingHeaders[idx] !== col);
    if (needsHeader) {
      sheet.getRange(1, 1, 1, headerRow.length).setValues([headerRow]);
    }

    const rows = [];
    const timestamp = new Date();

    const guests = Array.isArray(payload.guests) ? payload.guests : [];

    if (guests.length <= 2) {
      // Collapse into single family row
      const g1 = guests[0] || {};
      const g2 = guests[1] || {};

      rows.push([
        timestamp,
        payload.code || '',
        payload.attending || '',
        guests.length || 0,

        g1.name || '',
        g1.brunch || '',
        g1.shuttle || '',
        g1.email || '',
        g1.mainCourse || '',
        g1.langs || '',
        g1.diet || '',

        g2.name || '',
        g2.brunch || '',
        g2.shuttle || '',
        g2.email || '',
        g2.mainCourse || '',
        g2.langs || '',
        g2.diet || '',

        '', // GuestIndex
        '', // GuestName
        '', // Brunch
        '', // Shuttle
        '', // Email
        '', // MainCourse
        '', // MainCourseTick
        '', // Languages
        '', // Diet
        payload.message || '',
        payload.languageUI || ''
      ]);
    } else if (guests.length > 2) {
      // One row per guest for larger families
      guests.forEach(function (guest, index) {
        rows.push([
          timestamp,
          payload.code || '',
          payload.attending || '',
          guests.length || 0,

          '', '', '', '', '', '', '', // Guest1 cols empty
          '', '', '', '', '', '', '', // Guest2 cols empty

          index + 1,
          guest.name || '',
          guest.brunch || '',
          guest.shuttle || '',
          guest.email || '',
          guest.mainCourse || '',
          guest.mainCourseTick || '',
          guest.langs || '',
          guest.diet || '',
          payload.message || '',
          payload.languageUI || ''
        ]);
      });
    }

    if (rows.length) {
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    }

    return jsonResponse({ status: 'success', rows: rows.length });
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message || String(err) }, 500);
  }
}

function jsonResponse(payload, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}
