let SendBtn = document.getElementById('sendBtn');

const webhookURL = 'https://discord.com/api/webhooks/1400067519213076500/-k9AZ7q_ZaP28NXgVeP8GniyuE0tta1SMupvBWNmfw6XFA-bLO0MJvd56YSxmIrD8S4t';

// دالة تبعت رسالة عادية
function sendPlainMessage(content) {
  fetch(webhookURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  })
  .then(res => {
    if (res.ok) {
      console.log('✅ رسالة عادية اتبعتت!');
    } else {
      console.error('❌ في مشكلة في إرسال الرسالة العادية.');
    }
  });
}

// دالة تبعت Embed Message
function sendEmbedMessage(title, description, color = 0x00ff99) {
  return fetch(webhookURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      embeds: [
        {
          title: title,
          description: description,
          color: color
        }
      ]
    })
  })
  .then(res => {
    if (res.ok) {
      console.log('✅ Embed اتبعتت!');
    } else {
      console.error('❌ في مشكلة في إرسال الـ embed.');
    }
  });
}

// عند الضغط على الزر
SendBtn.addEventListener('click', () => {
  let name = document.getElementById('n').value.trim();
  let email = document.getElementById('e').value.trim();
  let phone = document.getElementById('p').value.trim();
  let message = document.getElementById('m').value.trim();

  if (name && email && message) {
    sendEmbedMessage(
      `Message from ${name}`,
      `📧 Email: ${email}\n📱 Phone: ${phone || "N/A"}\n💬 Msg:\n${message}`
    );
    console.log('تم إرسال الرسالة بنجاح!');
    alert("message sent");
  } else {
    console.log('⚠️ الرجاء ملء جميع الحقول.');
  }
});
