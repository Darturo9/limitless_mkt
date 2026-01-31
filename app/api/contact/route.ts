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

    const internalMailOptions = {
      from: `"Web Limitless MKT" <${process.env.SMTP_USER}>`,
      to: recipients,
      subject: `Nueva consulta de ${name} - ${service || "Consulta general"}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #80c12f; color: #000; padding: 20px; }
              .content { background: #fff; padding: 20px; border: 1px solid #e0e0e0; }
              .field { margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-left: 3px solid #80c12f; }
              .label { font-weight: bold; color: #1a1a27; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🚀 Nueva Consulta desde el Sitio Web</h2>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Nombre:</span> ${name}
                </div>
                <div class="field">
                  <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                </div>
                <div class="field">
                  <span class="label">Teléfono:</span> ${phone ? `<a href="tel:${phone}">${phone}</a>` : "No proporcionado"}
                </div>
                <div class="field">
                  <span class="label">Empresa:</span> ${company || "No especificada"}
                </div>
                <div class="field">
                  <span class="label">Instagram/Web:</span> ${instagram || "No proporcionado"}
                </div>
                <div class="field">
                  <span class="label">Servicio de interés:</span> ${service || "No especificado"}
                </div>
                <div class="field">
                  <span class="label">Mensaje:</span><br>
                  ${message}
                </div>
                <p style="margin-top: 20px; padding: 15px; background: #ccff00; border-radius: 5px;">
                  <strong>⚡ Acción requerida:</strong> Responder a este cliente lo antes posible.
                </p>
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
