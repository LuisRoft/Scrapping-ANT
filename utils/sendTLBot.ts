process.loadEnvFile();

export const sendMessage = async ({ message }: { message: string }) => {
  try {
    await fetch(
      `https://api.telegram.org/bot${
        process.env.TELEGRAM_KEY
      }/sendMessage?chat_id=@${
        process.env.TL_NAME_CHANNEL
      }&text=${encodeURIComponent(message)}`
    );

    console.log("😄 Message sent successfully");
  } catch (error) {
    console.error(error);
  }
};
