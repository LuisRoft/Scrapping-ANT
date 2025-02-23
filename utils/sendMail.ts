process.loadEnvFile();

export const sendMail = async ({
  to,
  emailTo,
  message,
}: {
  to: string;
  emailTo: string;
  message: string;
}) => {
  try {
    await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.MJ_PUBLIC_KEY}:${process.env.MJ_PRIVATE_KEY}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: "luisvelasco6541@gmail.com",
              Name: "Citaciones ANT",
            },
            To: [
              {
                Email: emailTo,
                Name: to,
              },
            ],
            Subject: "Citaciones ANT",
            TextPart: `${message}`,
            HTMLPart: `
              <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            `,
          },
        ],
      }),
    });

    console.log("😄 Mail sent successfully");
  } catch (error) {
    console.error(error);
  }
};
