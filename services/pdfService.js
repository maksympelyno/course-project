exports.fillingPDF = (dataArray) => {
  const today = new Date();
  const downloadTime = `${today.getDate()}.${
    today.getMonth() + 1
  }.${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`;
  let tableRows = "";

  dataArray.forEach((data) => {
    tableRows += `
            <tr class="item">
                <td>${data.match_id}</td>
                <td>${data.season.name}</td>
                <td>${data.homeTeam.name}</td>
                <td>${data.awayTeam.name}</td>
                <td>${data.stadium}</td>
                <td>${new Date(data.date).toLocaleString()}</td>
            </tr>
        `;
  });

  return `
    <!doctype html>
    <html>
        <head>
                <meta charset="utf-8">
                <title>PDF </title>
                <style>
                .invoice-box {
                max-width: 800px;
                margin: auto;
                padding: 30px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                font-size: 16px;
                line-height: 24px;
                font-family: 'Helvetica Neue', 'Helvetica',
                color: #000;
                }
                .margin-top {
                margin-top: 50px;
                }
                .justify-center {
                text-align: center;
                }
                .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
                }
                .invoice-box table td {
                padding: 5px;
                vertical-align: top;
                }
                .invoice-box table tr td:nth-child(2) {
                text-align: right;
                }
                .invoice-box table tr.top table td {
                padding-bottom: 20px;
                }
                .invoice-box table tr.top table td.title {
                font-size: 45px;
                line-height: 45px;
                color: #4b0082;
                }
                .invoice-box table tr.information table td {
                padding-bottom: 40px;
                }
                .invoice-box table tr.heading td {
                background: #eee;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
                }
                .invoice-box table tr.details td {
                padding-bottom: 20px;
                }
                .invoice-box table tr.item td {
                border-bottom: 1px solid #eee;
                }
                .invoice-box table tr.item.last td {
                border-bottom: none;
                }
                .invoice-box table tr.total td:nth-child(2) {
                border-top: 2px solid #eee;
                font-weight: bold;
                }
                @media only screen and (max-width: 600px) {
                .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
                }
                .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
                }
                }
            </style>
        </head>
        <body>
            <div class="invoice-box">
                <table cellpadding="0" cellspacing="0">
                    <tr class="top">
                        <td colspan="5">
                            <h2 class="justify-center">Download date ${downloadTime}</h2>
                        </td>
                    </tr>
                    <tr class="heading">
                        <td>Match ID</td>
                        <td>Season</td>
                        <td>Home Team</td>
                        <td>Away Team</td>
                        <td>Stadium</td>
                        <td>Date</td>
                    </tr>
                    ${tableRows}
                </tr>
                </table>
            </div>
        </body>
    </html>
    `;
};
