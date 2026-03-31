// Ye function dynamically data lega aur formatted HTML return karega
const generatePremiumContactEmail = (name, email, message) => {
  return `
    <div style="background-color: #050505; color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #111111; border: 1px solid #222222; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">

        <div style="text-align: center; padding: 30px 20px; border-bottom: 1px solid #222222; background: linear-gradient(180deg, #1a1a1a 0%, #111111 100%);">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 4px; color: #ffffff; text-transform: uppercase;">KALAKAAR</h1>
          <p style="margin: 5px 0 0; font-size: 12px; font-weight: 600; letter-spacing: 2px; color: #888888; text-transform: uppercase;">Ventures Command Center</p>
        </div>

        <div style="padding: 40px 30px;">
          <div style="display: inline-block; background-color: #222222; color: #ffffff; font-size: 11px; font-weight: bold; letter-spacing: 1px; padding: 6px 12px; border-radius: 4px; margin-bottom: 20px; text-transform: uppercase; border: 1px solid #333;">
            New Target Acquired
          </div>

          <p style="font-size: 16px; color: #cccccc; margin-bottom: 30px; line-height: 1.6;">
            Boss, a new prospect has initiated contact through the secure portal. Here is the intel:
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
            <tr>
              <td width="30%" style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">Client Name</td>
              <td width="70%" style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff; font-size: 16px; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td width="30%" style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">Return Path</td>
              <td width="70%" style="padding: 12px 0; border-bottom: 1px solid #222; color: #00aaff; font-size: 16px;">
                <a href="mailto:${email}" style="color: #4da6ff; text-decoration: none;">${email}</a>
              </td>
            </tr>
          </table>

          <h3 style="font-size: 13px; color: #888; margin-bottom: 10px; letter-spacing: 1px; text-transform: uppercase;">Project Vision</h3>
          <div style="background-color: #1a1a1a; border-left: 4px solid #ffffff; padding: 20px; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; font-size: 15px; line-height: 1.8; color: #e0e0e0; font-style: italic;">
              "${message.replace(/\n/g, '<br>')}"
            </p>
          </div>
        </div>

        <div style="text-align: center; padding: 20px; background-color: #0a0a0a; border-top: 1px solid #222222;">
          <p style="margin: 0; font-size: 11px; color: #555555; letter-spacing: 1px;">
            SECURELY ROUTED VIA KALAKAAR MAINFRAME &bull; SYSTEM V2.0
          </p>
        </div>

      </div>
    </div>
  `;
};

module.exports = { generatePremiumContactEmail };