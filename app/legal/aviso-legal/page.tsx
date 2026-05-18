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
  title: "Galgo Astral · Aviso Legal",
  description: "Información legal del prestador del servicio Galgo Astral.",
};

const CONTENT_ES: LegalContent = {
  title: "Aviso Legal",
  lastUpdatedLabel: "ÚLTIMA ACTUALIZACIÓN",
  lastUpdated: "18 de mayo de 2026",
  sections: [
    {
      title: "1. Identificación del prestador del servicio",
      body: (
        <>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio,
            de Servicios de la Sociedad de la Información y del Comercio
            Electrónico (LSSI-CE), se ponen a disposición de los usuarios los
            siguientes datos identificativos del titular del sitio web{" "}
            <strong>galgoastral.com</strong>:
          </p>
          <ul>
            <li>
              <strong>Nombre:</strong> Pau H. Maravi Busquets
            </li>
            <li>
              <strong>NIF:</strong> 37342698J
            </li>
            <li>
              <strong>Domicilio:</strong> Islas Baleares, España
            </li>
            <li>
              <strong>Correo electrónico:</strong>{" "}
              <a href="mailto:galgoastral.tiny242@passinbox.com">
                galgoastral.tiny242@passinbox.com
              </a>
            </li>
            <li>
              <strong>Actividad:</strong> Servicios digitales de interpretación
              astrológica simbólica
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "2. Comunicaciones",
      body: (
        <p>
          Las comunicaciones con el prestador del servicio podrán realizarse a
          través del correo electrónico indicado, comprometiéndose este a una
          respuesta en un plazo razonable, no superior a 10 días hábiles.
        </p>
      ),
    },
    {
      title: "3. Condiciones de uso",
      body: (
        <p>
          El acceso y uso del sitio web atribuye la condición de usuario e
          implica la aceptación de las presentes condiciones, así como de los{" "}
          <a href="/legal/terminos">Términos y Condiciones</a> y de la{" "}
          <a href="/legal/privacidad">Política de Privacidad</a> publicadas en
          este mismo sitio.
        </p>
      ),
    },
    {
      title: "4. Propiedad intelectual e industrial",
      body: (
        <p>
          Los textos, diseños, imágenes, marcas, logotipos y demás elementos del
          sitio web son propiedad de Pau H. Maravi Busquets o de terceros que
          han autorizado su uso, y están protegidos por la legislación española
          e internacional sobre propiedad intelectual e industrial. Queda
          prohibida su reproducción, distribución, comunicación pública o
          transformación sin autorización expresa del titular, salvo los usos
          permitidos por la ley.
        </p>
      ),
    },
    {
      title: "5. Limitación de responsabilidad",
      body: (
        <p>
          El prestador no garantiza la disponibilidad continua del servicio ni
          la ausencia de errores. Las lecturas ofrecidas son interpretaciones
          simbólicas con finalidad de entretenimiento y autoreflexión, y no
          constituyen consejo médico, psicológico, financiero, jurídico, ni de
          ningún otro tipo profesional. El usuario asume la responsabilidad del
          uso que haga de la información recibida.
        </p>
      ),
    },
    {
      title: "6. Ley aplicable y jurisdicción",
      body: (
        <p>
          El presente Aviso Legal se rige por la legislación española. Para la
          resolución de cualquier controversia derivada del acceso o uso del
          sitio web, las partes se someten a los Juzgados y Tribunales del
          domicilio del prestador, salvo que la legislación aplicable disponga
          otra cosa.
        </p>
      ),
    },
  ],
};

const CONTENT_EN: LegalContent = {
  title: "Legal Notice",
  lastUpdatedLabel: "LAST UPDATED",
  lastUpdated: "May 18, 2026",
  sections: [
    {
      title: "1. Service provider identification",
      body: (
        <>
          <p>
            In compliance with Article 10 of Spanish Law 34/2002 of July 11 on
            Information Society and Electronic Commerce Services (LSSI-CE), the
            following identification details of the owner of{" "}
            <strong>galgoastral.com</strong> are made available to users:
          </p>
          <ul>
            <li>
              <strong>Name:</strong> Pau H. Maravi Busquets
            </li>
            <li>
              <strong>Tax ID:</strong> 37342698J
            </li>
            <li>
              <strong>Address:</strong> Balearic Islands, Spain
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:galgoastral.tiny242@passinbox.com">
                galgoastral.tiny242@passinbox.com
              </a>
            </li>
            <li>
              <strong>Activity:</strong> Digital services of symbolic
              astrological interpretation
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "2. Communications",
      body: (
        <p>
          Communications with the service provider may be made through the
          email address indicated above. The provider commits to a response
          within a reasonable timeframe, no longer than 10 business days.
        </p>
      ),
    },
    {
      title: "3. Terms of use",
      body: (
        <p>
          Access to and use of the website grants the user status and implies
          acceptance of these terms, as well as the{" "}
          <a href="/legal/terminos?lang=en">Terms and Conditions</a> and{" "}
          <a href="/legal/privacidad?lang=en">Privacy Policy</a> published on
          this site.
        </p>
      ),
    },
    {
      title: "4. Intellectual and industrial property",
      body: (
        <p>
          Texts, designs, images, trademarks, logos and other elements of the
          website are property of Pau H. Maravi Busquets or third parties who
          have authorised their use, and are protected by Spanish and
          international intellectual and industrial property law. Reproduction,
          distribution, public communication or transformation without express
          authorisation of the owner is prohibited, except for uses permitted
          by law.
        </p>
      ),
    },
    {
      title: "5. Limitation of liability",
      body: (
        <p>
          The provider does not guarantee continuous availability of the
          service nor the absence of errors. The readings offered are symbolic
          interpretations intended for entertainment and self-reflection, and
          do not constitute medical, psychological, financial, legal or any
          other professional advice. The user assumes responsibility for the
          use they make of the information received.
        </p>
      ),
    },
    {
      title: "6. Applicable law and jurisdiction",
      body: (
        <p>
          This Legal Notice is governed by Spanish law. For the resolution of
          any dispute arising from access to or use of the website, the parties
          submit to the courts of the provider’s domicile, unless applicable
          law provides otherwise.
        </p>
      ),
    },
  ],
};

export default async function AvisoLegalPage({ searchParams }: Props) {
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
