# Apps Script RSVP Backend

This folder contains a Google Apps Script backend for the wedding RSVP form.

## Files

- `Code.gs` - the Apps Script endpoint that accepts POST requests and writes RSVP rows to a Google Sheet.
- `appsscript.json` - Apps Script manifest.

## Setup

1. Open [script.google.com](https://script.google.com) and create a new Apps Script project.
2. Copy the contents of `Code.gs` into the script editor.
3. In `Code.gs`, replace:
   - `SPREADSHEET_ID` with your Google Sheet ID.
   - `VALID_TOKEN` with the same token from `rsvp.js` (`API_TOKEN`).
4. Save the project.

## Deploy

1. Click **Deploy** → **New deployment**.
2. Choose **Web app**.
3. Set **Execute as** to `Me`.
4. Set **Who has access** to `Anyone` or `Anyone with the link` depending on your security preference.
5. Deploy and copy the web app URL.

## Update the front-end

In `rsvp.js`, set:

```js
const SCRIPT_URL = 'YOUR_DEPLOYED_WEB_APP_URL';
```

## Test payload

Use this example to verify the endpoint:

```bash
curl -X POST 'YOUR_DEPLOYED_WEB_APP_URL' \
  -H 'Content-Type: application/json' \
  -d '{
    "token":"REPLACE_WITH_API_TOKEN_USED_IN_RSVP_JS",
    "code":"Doe-Party",
    "attending":"Yes",
    "languageUI":"en",
    "message":"Looking forward to it!",
    "guests":[
      {"name":"Alice Doe","brunch":"Yes","shuttle":"Yes","email":"alice@example.com","langs":"English","diet":"None"},
      {"name":"Bob Doe","brunch":"No","shuttle":"No","email":"alice@example.com","langs":"English","diet":"Vegetarian"}
    ]
  }'
```

## Notes

- The script writes one row per guest.
- If no `guests` array is provided, it writes a single summary row.
- The sheet header row is created automatically if missing.
