import axios from 'axios';

export default async function handler(req, res/*URI, type*/) {
  try {
    const API_URL = 'https://api.stl-emporium.ru/api';
    let type = 'creature';
    const tokenGetCreatures = process.env.TOKEN_GET_CREATURES;
    const tokenTomesOfUnderstanding = process.env.TOKEN_TOMES_OF_UNDERSTANDING;
    let token = tokenGetCreatures;
    if (type === 'tomes') token = tokenTomesOfUnderstanding
    const api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenGetCreatures}`
      },
    });
    const response = await api.get('https://api.stl-emporium.ru/api/creatures?populate=*&sort=createdAt:desc&filters[isHero][$eq]=true');
    if (response.error) {
      res.status(200).json({ status: 'Error' });
    } else {
      res.status(200).json({
        data: response.data?.data,
        meta: response.data?.meta,
      });
    }
  } catch (error) {
    console.log(error)
    //throw new Error('Failed to fetch data from URI.');
  }
};

/*export default async function handler(req, res) {
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const { total, vk, telegram, mail, preferredMethod, identificator } = req.query;
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
}*/