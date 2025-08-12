let SendBtn = document.getElementById('sendBtn');


const webhookURL = 'https://discord.com/api/webhooks/1400067519213076500/-k9AZ7q_ZaP28NXgVeP8GniyuE0tta1SMupvBWNmfw6XFA-bLO0MJvd56YSxmIrD8S4t';

// دالة تبعت رسالة عادية
function sendPlainMessage(content) {
  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: content
    })
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
  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
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
      // console.log('✅ Embed اتبعتت!');
    } else {
      console.error('❌ في مشكلة في إرسال الـ embed.');
    }
  });
}

// sendPlainMessage('يا أهلاً بأصحابي! 😄');
// sendEmbedMessage('تنبيه مهم!', 'دي رسالة بشكل Embed ✨'); // Embed

SendBtn.addEventListener('click', function() {
  let name = document.getElementById('n').value;
  let email = document.getElementById('e').value;
  let phone = document.getElementById('p').value;
  let message = document.getElementById('m').value;

  if (name && email && message && phone) {
    sendEmbedMessage(
      `Message from ${name}`,
      `Email: ${email}\n\ Phone: ${phone} \n Msg:\n${message} `,
    );
    alert('تم إرسال الرسالة بنجاح!');
  } else {
    alert('الرجاء ملء جميع الحقول.');
  }
});