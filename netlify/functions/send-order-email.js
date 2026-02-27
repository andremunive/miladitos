// Netlify Function para enviar el correo de pedido con Resend
// Endpoint: /.netlify/functions/send-order-email

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
          error: 'Falta RESEND_API_KEY en las variables de entorno',
        }),
      };
    }

    const payload = JSON.parse(event.body || '{}');
    const subject = payload.subject || '';
    const html = payload.html || '';

    if (!subject || !html) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'subject y html son requeridos' }),
      };
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['miladitosco@gmail.com'],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error al enviar correo con Resend:', response.status, errorText);
      let errorDetail = 'Error al enviar el correo';
      try {
        const errJson = JSON.parse(errorText);
        if (errJson && errJson.message) errorDetail = errJson.message;
      } catch (_) {
        if (errorText) errorDetail = errorText;
      }
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
          error: errorDetail,
          resendStatus: response.status,
        }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error('Excepción en send-order-email:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Error interno en la función de correo' }),
    };
  }
};

