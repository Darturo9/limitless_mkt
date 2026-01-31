import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  console.log("📧 [API Contact] Iniciando proceso de envío de email...");

  try {
    const body = await request.json();
    console.log("📝 [API Contact] Datos recibidos:", {
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      instagram: body.instagram,
      service: body.service,
      messageLength: body.message?.length
    });

    const { name, email, phone, company, instagram, service, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      console.error("❌ [API Contact] Validación fallida: Faltan campos requeridos");
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Verificar variables de entorno
    console.log("🔑 [API Contact] Verificando credenciales SMTP...");
    console.log("   SMTP_USER:", process.env.SMTP_USER ? "✅ Configurado" : "❌ NO configurado");
    console.log("   SMTP_PASSWORD:", process.env.SMTP_PASSWORD ? "✅ Configurado" : "❌ NO configurado");

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("❌ [API Contact] Variables de entorno SMTP no configuradas");
      return NextResponse.json(
        { error: "Configuración de email no disponible" },
        { status: 500 }
      );
    }

    // Configurar transporter de Gmail
    console.log("⚙️ [API Contact] Configurando transporter de Gmail...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verificar conexión
    console.log("🔌 [API Contact] Verificando conexión SMTP...");
    await transporter.verify();
    console.log("✅ [API Contact] Conexión SMTP verificada correctamente");

    // Email para el cliente (confirmación)
    const clientMailOptions = {
      from: `"Limitless MKT" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Gracias por contactarnos - Limitless MKT",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1a1a27; color: #fffff0; padding: 30px; text-align: center; }
              .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; }
              .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
              .highlight { color: #80c12f; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>¡Gracias por contactarnos!</h1>
              </div>
              <div class="content">
                <p>Hola <strong>${name}</strong>,</p>
                <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.</p>
                <p><strong>Resumen de tu consulta:</strong></p>
                <ul>
                  <li><strong>Empresa:</strong> ${company || "No especificada"}</li>
                  <li><strong>Servicio:</strong> ${service || "No especificado"}</li>
                  <li><strong>Teléfono:</strong> ${phone || "No proporcionado"}</li>
                  <li><strong>Instagram/Web:</strong> ${instagram || "No proporcionado"}</li>
                </ul>
                <p><strong>Tu mensaje:</strong></p>
                <p style="background: #f5f5f5; padding: 15px; border-left: 3px solid #80c12f;">${message}</p>
                <p>Nuestro equipo revisará tu solicitud y te responderá en menos de 24 horas.</p>
                <p>¡Gracias por confiar en <span class="highlight">Limitless MKT</span>!</p>
              </div>
              <div class="footer">
                <p>© 2025 Limitless MKT. Todos los derechos reservados.</p>
                <p>
                  <a href="https://www.instagram.com/limitless_mkt/" style="color: #80c12f; text-decoration: none;">Instagram</a> |
                  <a href="https://www.linkedin.com/company/104523106/" style="color: #80c12f; text-decoration: none;">LinkedIn</a> |
                  <a href="https://www.facebook.com/profile.php?id=61559219050883" style="color: #80c12f; text-decoration: none;">Facebook</a>
                </p>
                <p>+502 5517 9410 | +502 5133 2551</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Email para Limitless MKT (notificación interna)
    // Puedes agregar múltiples emails separados por coma en SMTP_RECIPIENTS
    const recipients = process.env.SMTP_RECIPIENTS || process.env.SMTP_USER;

    const now = new Date();
    const timestamp = now.toLocaleDateString("es-GT", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Guatemala",
    });

    const internalMailOptions = {
      from: `"Web Limitless MKT" <${process.env.SMTP_USER}>`,
      to: recipients,
      subject: `[Limitless MKT] Nueva consulta: ${name} — ${service || "Consulta general"}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nueva consulta - Limitless MKT</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                background-color: #0f0f1a;
                font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
                color: #e8e8e0;
                -webkit-font-smoothing: antialiased;
              }
              .wrapper {
                max-width: 640px;
                margin: 32px auto;
                background: #1a1a2e;
                border-radius: 16px;
                overflow: hidden;
                border: 1px solid #2a2a4a;
                box-shadow: 0 8px 40px rgba(0,0,0,0.4);
              }

              /* Header */
              .header {
                background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
                border-bottom: 2px solid #80c12f;
                padding: 32px 28px 24px;
                text-align: center;
              }
              .header-badge {
                display: inline-block;
                background: #80c12f;
                color: #0f0f1a;
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 2px;
                padding: 5px 14px;
                border-radius: 20px;
                margin-bottom: 14px;
              }
              .header h1 {
                margin: 0 0 6px;
                font-size: 22px;
                font-weight: 700;
                color: #ffffff;
              }
              .header .timestamp {
                font-size: 12px;
                color: #6b6b8a;
              }

              /* Alert bar */
              .alert-bar {
                background: linear-gradient(135deg, #ccff00 0%, #a8d900 100%);
                padding: 14px 28px;
                display: flex;
                align-items: center;
                gap: 10px;
              }
              .alert-bar .alert-icon {
                font-size: 18px;
                flex-shrink: 0;
              }
              .alert-bar p {
                margin: 0;
                font-size: 13px;
                font-weight: 700;
                color: #0f0f1a;
              }

              /* Body */
              .body {
                padding: 28px;
              }

              /* Client card */
              .client-card {
                background: #141428;
                border: 1px solid #2a2a4a;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 24px;
              }
              .client-card-header {
                display: flex;
                align-items: center;
                gap: 14px;
                margin-bottom: 18px;
                padding-bottom: 16px;
                border-bottom: 1px solid #2a2a4a;
              }
              .avatar {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background: linear-gradient(135deg, #80c12f, #ccff00);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                font-weight: 700;
                color: #0f0f1a;
                flex-shrink: 0;
              }
              .client-name {
                font-size: 17px;
                font-weight: 700;
                color: #fff;
                margin: 0 0 2px;
              }
              .client-company {
                font-size: 12px;
                color: #6b6b8a;
                margin: 0;
              }

              /* Info grid */
              .info-grid {
                display: table;
                width: 100%;
              }
              .info-row {
                display: table-row;
              }
              .info-row td {
                padding: 8px 0;
                border-bottom: 1px solid #1e1e38;
                vertical-align: top;
                font-size: 13px;
              }
              .info-row:last-child td {
                border-bottom: none;
              }
              .info-label {
                color: #6b6b8a;
                width: 110px;
                padding-right: 12px !important;
                white-space: nowrap;
              }
              .info-value {
                color: #d4d4cc;
              }
              .info-value a {
                color: #80c12f;
                text-decoration: none;
              }
              .info-value a:hover {
                text-decoration: underline;
              }

              /* Service badge */
              .service-badge {
                display: inline-block;
                background: rgba(128,193,47,0.15);
                border: 1px solid rgba(128,193,47,0.4);
                color: #80c12f;
                font-size: 12px;
                font-weight: 600;
                padding: 4px 12px;
                border-radius: 20px;
              }

              /* Message section */
              .message-section {
                margin-bottom: 24px;
              }
              .section-label {
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                color: #6b6b8a;
                margin-bottom: 10px;
              }
              .message-box {
                background: #141428;
                border: 1px solid #2a2a4a;
                border-left: 3px solid #80c12f;
                border-radius: 8px;
                padding: 18px 20px;
                font-size: 14px;
                line-height: 1.7;
                color: #c8c8c0;
                white-space: pre-wrap;
                word-break: break-word;
              }

              /* CTA buttons */
              .cta-row {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
              }
              .cta-btn {
                display: inline-block;
                padding: 10px 22px;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 600;
                text-decoration: none;
                text-align: center;
              }
              .cta-primary {
                background: #80c12f;
                color: #0f0f1a;
              }
              .cta-secondary {
                background: transparent;
                border: 1px solid #2a2a4a;
                color: #a0a0a0;
              }

              /* Footer */
              .footer {
                background: #111122;
                border-top: 1px solid #2a2a4a;
                padding: 20px 28px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 8px;
              }
              .footer-left {
                font-size: 11px;
                color: #4a4a6a;
              }
              .footer-right {
                font-size: 11px;
                color: #4a4a6a;
              }
              .footer-right a {
                color: #80c12f;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="wrapper">

              <!-- Header -->
              <div class="header">
                <div class="header-badge">Notificación interna</div>
                <h1>Nueva consulta recibida</h1>
                <span class="timestamp">${timestamp}</span>
              </div>

              <!-- Alert bar -->
              <div class="alert-bar">
                <span class="alert-icon">⚡</span>
                <p>Nuevo lead — Por favor responde a este cliente lo antes posible.</p>
              </div>

              <!-- Body -->
              <div class="body">

                <!-- Client card -->
                <div class="client-card">
                  <div class="client-card-header">
                    <div class="avatar">${name.charAt(0).toUpperCase()}</div>
                    <div>
                      <p class="client-name">${name}</p>
                      <p class="client-company">${company || "Sin empresa"}</p>
                    </div>
                  </div>

                  <div class="info-grid">
                    <div class="info-row">
                      <td class="info-label">Email</td>
                      <td class="info-value"><a href="mailto:${email}">${email}</a></td>
                    </div>
                    <div class="info-row">
                      <td class="info-label">Teléfono</td>
                      <td class="info-value">${phone ? `<a href="tel:${phone}">${phone}</a>` : '<span style="color:#4a4a6a">No proporcionado</span>'}</td>
                    </div>
                    <div class="info-row">
                      <td class="info-label">Instagram/Web</td>
                      <td class="info-value">${instagram || '<span style="color:#4a4a6a">No proporcionado</span>'}</td>
                    </div>
                    <div class="info-row">
                      <td class="info-label">Servicio</td>
                      <td class="info-value"><span class="service-badge">${service || "Consulta general"}</span></td>
                    </div>
                  </div>
                </div>

                <!-- Mensaje -->
                <div class="message-section">
                  <div class="section-label">Mensaje del cliente</div>
                  <div class="message-box">${message}</div>
                </div>

                <!-- CTAs -->
                <div class="cta-row">
                  <a href="mailto:${email}?subject=Re: Tu consulta en Limitless MKT&body=Hola ${name},%0A%0A" class="cta-btn cta-primary">Responder por email</a>
                  ${phone ? `<a href="tel:${phone}" class="cta-btn cta-secondary">Llamar</a>` : ""}
                </div>
              </div>

              <!-- Footer -->
              <div class="footer">
                <span class="footer-left">Limitless MKT · Sistema de notificaciones</span>
                <span class="footer-right"><a href="https://limitlessmkt.com">limitlessmkt.com</a></span>
              </div>

            </div>
          </body>
        </html>
      `,
    };

    // Enviar email al cliente
    console.log("📤 [API Contact] Enviando email de confirmación al cliente...");
    const clientResult = await transporter.sendMail(clientMailOptions);
    console.log("✅ [API Contact] Email al cliente enviado:", clientResult.messageId);

    // Enviar email interno
    console.log("📤 [API Contact] Enviando notificación interna...");
    const internalResult = await transporter.sendMail(internalMailOptions);
    console.log("✅ [API Contact] Email interno enviado:", internalResult.messageId);

    console.log("🎉 [API Contact] Proceso completado exitosamente");

    return NextResponse.json(
      { message: "Emails enviados exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ [API Contact] Error crítico:", error);
    console.error("   Tipo de error:", error instanceof Error ? error.message : "Error desconocido");
    console.error("   Stack:", error instanceof Error ? error.stack : "No disponible");

    return NextResponse.json(
      { error: "Error al enviar el mensaje", details: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
