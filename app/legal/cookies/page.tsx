import type { Metadata } from "next";
import { CosmosBg } from "@/components/cosmos-bg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  LegalLayout,
  type LegalContent,
} from "@/components/legal/legal-layout";
import { getDictionary } from "@/lib/i18n";
import { pickLang } from "@shared/domain/lang";

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export const metadata: Metadata = {
  title: "Galgo Astral · Política de Cookies",
  description:
    "Cómo galgoastral.com utiliza cookies y almacenamiento web en el navegador.",
};

const CONTENT_ES: LegalContent = {
  title: "Política de Cookies y Almacenamiento",
  lastUpdatedLabel: "ÚLTIMA ACTUALIZACIÓN",
  lastUpdated: "18 de mayo de 2026",
  intro: (
    <p>
      Esta política explica cómo galgoastral.com utiliza cookies y otras
      tecnologías de almacenamiento en el navegador.
    </p>
  ),
  sections: [
    {
      title: "1. ¿Qué son las cookies y el almacenamiento web?",
      body: (
        <>
          <p>
            Las cookies son pequeños archivos de texto que un sitio web puede
            guardar en tu dispositivo para recordar información entre visitas.
            El almacenamiento web (sessionStorage y localStorage) son
            tecnologías similares pero limitadas a una sesión o al propio
            navegador.
          </p>
          <p>
            La legislación aplicable (LSSI-CE y GDPR) distingue entre
            almacenamiento técnico necesario (no requiere consentimiento) y
            almacenamiento de seguimiento, publicidad o análisis (sí requiere
            consentimiento explícito).
          </p>
        </>
      ),
    },
    {
      title: "2. ¿Qué utiliza este sitio?",
      body: (
        <>
          <p>
            Galgoastral.com utiliza únicamente almacenamiento técnico
            funcional, necesario para el funcionamiento del servicio:
          </p>
          <div className="legal-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Clave</th>
                  <th>Tipo</th>
                  <th>Finalidad</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>heda:lastReading:v1</code>
                  </td>
                  <td>sessionStorage</td>
                  <td>
                    Conservar tu carta natal durante la sesión para ofrecerte
                    la lectura premium de compatibilidad con tu mascota.
                  </td>
                  <td>Hasta cerrar la pestaña del navegador.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Este almacenamiento es estrictamente técnico-funcional. No requiere
            consentimiento explícito conforme al artículo 22.2 de la LSSI-CE y
            la guía de la Agencia Española de Protección de Datos.
          </p>
        </>
      ),
    },
    {
      title: "3. ¿Utilizamos cookies de seguimiento, publicidad o análisis?",
      body: (
        <>
          <p>
            <strong>No.</strong> No utilizamos cookies de seguimiento,
            publicidad, redes sociales ni análisis de terceros. No empleamos
            servicios como Google Analytics, Meta Pixel ni similares.
          </p>
          <p>
            Stripe, nuestro proveedor de pagos, gestiona sus propias cookies
            cuando eres redirigido a su pasarela de pago. Esas cookies son
            propiedad de Stripe, se gestionan en su propio dominio y están
            reguladas por su{" "}
            <a
              href="https://stripe.com/cookies-policy/legal"
              target="_blank"
              rel="noopener noreferrer"
            >
              política de cookies
            </a>
            .
          </p>
        </>
      ),
    },
    {
      title: "4. ¿Cómo desactivar el almacenamiento web?",
      body: (
        <>
          <p>
            Puedes desactivar o borrar el almacenamiento de tu navegador en
            cualquier momento mediante la configuración de privacidad o el
            historial de navegación. Consulta la ayuda de tu navegador
            (Chrome, Firefox, Safari, Edge, Brave, etc.) para los pasos
            concretos.
          </p>
          <p>
            Si desactivas el almacenamiento web, la lectura premium de
            compatibilidad con tu mascota no podrá funcionar correctamente, ya
            que necesita conservar tu carta natal entre la generación y el
            pago. El resto del servicio seguirá operativo.
          </p>
        </>
      ),
    },
    {
      title: "5. Cambios en esta política",
      body: (
        <p>
          Cualquier modificación de esta política se publicará en esta misma
          página, indicando la fecha de actualización en la cabecera.
        </p>
      ),
    },
  ],
};

const CONTENT_EN: LegalContent = {
  title: "Cookie and Storage Policy",
  lastUpdatedLabel: "LAST UPDATED",
  lastUpdated: "May 18, 2026",
  intro: (
    <p>
      This policy explains how galgoastral.com uses cookies and other browser
      storage technologies.
    </p>
  ),
  sections: [
    {
      title: "1. What are cookies and web storage?",
      body: (
        <>
          <p>
            Cookies are small text files that a website can store on your
            device to remember information between visits. Web storage
            (sessionStorage and localStorage) are similar technologies but
            limited to a session or to the browser itself.
          </p>
          <p>
            Applicable law (Spain’s LSSI-CE and the EU GDPR) distinguishes
            between technical-necessary storage (no consent required) and
            tracking, advertising or analytics storage (explicit consent
            required).
          </p>
        </>
      ),
    },
    {
      title: "2. What does this site use?",
      body: (
        <>
          <p>
            Galgoastral.com uses only functional technical storage, required
            for the service to work:
          </p>
          <div className="legal-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Type</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>heda:lastReading:v1</code>
                  </td>
                  <td>sessionStorage</td>
                  <td>
                    Preserve your natal chart during the session so we can
                    offer the premium pet compatibility reading.
                  </td>
                  <td>Until the browser tab is closed.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            This storage is strictly technical-functional. It does not require
            explicit consent under Article 22.2 of Spain’s LSSI-CE and the
            guidance of the Spanish Data Protection Agency (AEPD).
          </p>
        </>
      ),
    },
    {
      title: "3. Do we use tracking, advertising or analytics cookies?",
      body: (
        <>
          <p>
            <strong>No.</strong> We do not use tracking, advertising, social
            media or third-party analytics cookies. We do not use services
            such as Google Analytics, Meta Pixel or similar.
          </p>
          <p>
            Stripe, our payment provider, manages its own cookies when you are
            redirected to its checkout page. Those cookies are owned by
            Stripe, managed on its own domain and governed by its{" "}
            <a
              href="https://stripe.com/cookies-policy/legal"
              target="_blank"
              rel="noopener noreferrer"
            >
              cookie policy
            </a>
            .
          </p>
        </>
      ),
    },
    {
      title: "4. How to disable web storage",
      body: (
        <>
          <p>
            You can disable or clear your browser’s storage at any time via the
            privacy settings or browsing history. Check your browser’s help
            pages (Chrome, Firefox, Safari, Edge, Brave, etc.) for the exact
            steps.
          </p>
          <p>
            If you disable web storage, the premium pet compatibility reading
            will not work properly, since it needs to preserve your natal
            chart between generation and payment. The rest of the service will
            remain operational.
          </p>
        </>
      ),
    },
    {
      title: "5. Changes to this policy",
      body: (
        <p>
          Any modification to this policy will be published on this same page,
          with the updated date shown in the header.
        </p>
      ),
    },
  ],
};

export default async function CookiesPage({ searchParams }: Props) {
  const { lang: rawLang } = await searchParams;
  const lang = pickLang(rawLang);
  const t = getDictionary(lang);
  const content = lang === "en" ? CONTENT_EN : CONTENT_ES;

  return (
    <>
      <CosmosBg />
      <main
        className="relative"
        style={{ color: "#f5ecd6", fontFamily: "var(--font-body), serif" }}
      >
        <SiteHeader lang={lang} t={t.nav} />
        <LegalLayout {...content} />
        <SiteFooter lang={lang} t={t.footer} />
      </main>
    </>
  );
}
