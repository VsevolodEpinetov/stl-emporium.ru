export default async function handler(req, res) {
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const {total, vk, telegram, mail, preferredMethod, identificator} = req.query;
  let messageText = `Новый заказ с STL Emporium!%0A%0A`
  messageText += `📨 <b>Контакты</b>%0A`
  messageText += `VK: ${vk}%0A`
  messageText += `Telegram: ${telegram}%0A`
  messageText += `Почта: ${mail}%0A`
  messageText += `Просят связаться через: ${preferredMethod}%0A%0A`
  messageText += `ℹ️ <b>Общие данные</b>%0A`
  messageText += `Сумма: ${total}%0A`
  messageText += `Идентификатор заказа: ${identificator}%0A`
  const response = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage?chat_id=${chatId}&text=${messageText}&parse_mode=HTML`, {
    method: "POST"
  })

  if (!response.ok) {
    res.status(200).json({ status: 'Error' });
  } else {
    res.status(200).json({ status: 'Ok' });
  }
}