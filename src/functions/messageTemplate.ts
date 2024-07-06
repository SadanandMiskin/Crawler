export function messageTemplate(username: string , url: string , title: string, body: string) {
    return ` <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px;
                    text-align: center;
                }
                .content {
                    padding: 20px;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 0.9em;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Issue Notification</h1>
                </div>
                <div class="content">
                    <p>Hi ${username},</p>
                    <p>Just found a new Issue Update, Have a look at it.</p>
                    <h2><strong>Title:</strong> ${title}</h2>
                    <h4> ${body}</b4>
                    <h5>Link: <a href="${url}">Issue Link</a></h5>
                </div>
                <div class="footer">
                    <p>Regards, Crawler.</p>
                </div>
            </div>
        </body>
        </html>`
}