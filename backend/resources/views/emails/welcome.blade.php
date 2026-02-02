<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a BBr</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #000000;
            margin: 0;
            padding: 0;
            color: #ffffff;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0a0a0a;
            border: 1px solid #222;
        }

        .header {
            padding: 40px 20px;
            text-align: center;
            border-bottom: 1px solid #222;
        }

        .logo {
            font-size: 32px;
            font-weight: 900;
            color: #ffffff;
            text-decoration: none;
            letter-spacing: -1px;
        }

        .dot {
            color: #f97316;
            /* Orange-500 */
        }

        .content {
            padding: 40px 30px;
            text-align: left;
        }

        h1 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 20px;
            color: #ffffff;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            color: #a3a3a3;
            /* Neutral-400 */
            margin-bottom: 20px;
        }

        .btn-container {
            text-align: center;
            margin: 30px 0;
        }

        .btn {
            display: inline-block;
            background-color: #f97316;
            color: #000000;
            padding: 14px 32px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 800;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .footer {
            padding: 30px;
            text-align: center;
            background-color: #000000;
            border-top: 1px solid #222;
            color: #525252;
            font-size: 12px;
            font-family: monospace;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- HEADER / LOGO -->
        <div class="header">
            <div class="logo">
                BBR<span class="dot">.</span>
            </div>
            <div
                style="font-family: monospace; font-size: 10px; color: #f97316; letter-spacing: 2px; margin-top: 5px; text-transform: uppercase;">
                /// Plataforma_de_Descubrimiento_Social
            </div>
        </div>

        <!-- MAIN CONTENT -->
        <div class="content">
            <h1>¡Hola, {{ $user->name }}!</h1>

            <p>
                Bienvenido a la comunidad. Has dado el primer paso para descubrir los lugares más auténticos de Castilla
                y León.
            </p>

            <p>
                En BBr no usamos algoritmos ocultos. Simplemente conectamos personas con bares reales, eventos y
                experiencias sin filtros.
            </p>

            <div class="btn-container">
                <a href="{{ url('/.') }}" class="btn">Explorar Ahora</a>
            </div>

            <p style="font-size: 14px; margin-top: 30px; border-top: 1px solid #222; padding-top: 20px;">
                Si tienes alguna duda, estamos aquí para ayudarte. Simplemente responde a este correo.
            </p>
        </div

        <!-- FOOTER -->
        <div class="footer">
            <p style="margin-bottom: 10px;">EST. 2026 &bull; CASTILLA Y LEÓN</p>
            <p>
                BBr Inc.<br>
                Descubre tu sitio.
            </p>
        </div>
    </div>
</body>

</html>