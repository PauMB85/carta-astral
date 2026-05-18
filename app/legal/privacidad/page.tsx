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
  title: "Galgo Astral · Política de Privacidad",
  description:
    "Cómo galgoastral.com trata tus datos personales conforme al GDPR y la LOPDGDD.",
};

const CONTENT_ES: LegalContent = {
  title: "Política de Privacidad",
  lastUpdatedLabel: "ÚLTIMA ACTUALIZACIÓN",
  lastUpdated: "18 de mayo de 2026",
  intro: (
    <p>
      Esta política describe qué datos personales tratamos cuando utilizas el
      servicio galgoastral.com, con qué finalidad, durante cuánto tiempo y
      cuáles son tus derechos conforme al Reglamento General de Protección de
      Datos (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
    </p>
  ),
  sections: [
    {
      title: "1. Responsable del tratamiento",
      body: (
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
            <strong>Correo de contacto:</strong>{" "}
            <a href="mailto:galgoastral.tiny242@passinbox.com">
              galgoastral.tiny242@passinbox.com
            </a>
          </li>
        </ul>
      ),
    },
    {
      title: "2. Datos personales que tratamos",
      body: (
        <>
          <p>Tratamos las siguientes categorías de datos:</p>
          <ul>
            <li>
              <strong>Datos del formulario natal:</strong> nombre (opcional),
              fecha de nacimiento, hora de nacimiento (opcional), lugar de
              nacimiento (opcional), foco de interés (amor o vida general) e
              idioma de preferencia.
            </li>
            <li>
              <strong>Datos del formulario de mascota</strong> (solo si
              contratas la lectura premium): nombre, especie (perro o gato),
              fecha de nacimiento o adopción, género declarado, rasgos de
              personalidad y foco relacional.
            </li>
            <li>
              <strong>Datos de pago:</strong> gestionados directamente por
              Stripe en su propia plataforma. Galgoastral.com{" "}
              <strong>nunca almacena ni accede</strong> al número de tarjeta,
              CVC ni datos bancarios.
            </li>
            <li>
              <strong>Datos técnicos:</strong> dirección IP, agente de usuario,
              fecha y hora de la visita. Se utilizan para rate limiting y
              registros de operación.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "3. Finalidad del tratamiento",
      body: (
        <ul>
          <li>
            Generar la interpretación astrológica simbólica solicitada (carta
            natal y, si procede, compatibilidad con mascota).
          </li>
          <li>
            Gestionar el cobro del servicio premium a través de Stripe y
            cumplir las obligaciones contables y fiscales.
          </li>
          <li>
            Prevenir abusos del servicio mediante limitación de peticiones por
            dirección IP.
          </li>
          <li>
            Atender solicitudes de los usuarios relativas al ejercicio de sus
            derechos.
          </li>
        </ul>
      ),
    },
    {
      title: "4. Base jurídica",
      body: (
        <ul>
          <li>
            <strong>Ejecución del contrato</strong> (Art. 6.1.b RGPD) — para
            entregar el servicio y procesar el pago.
          </li>
          <li>
            <strong>Interés legítimo</strong> (Art. 6.1.f RGPD) — para prevenir
            abusos y garantizar la seguridad del servicio (rate limiting).
          </li>
          <li>
            <strong>Cumplimiento de una obligación legal</strong> (Art. 6.1.c
            RGPD) — para conservar registros contables y fiscales.
          </li>
        </ul>
      ),
    },
    {
      title: "5. Encargados del tratamiento (sub-procesadores)",
      body: (
        <>
          <p>
            Para prestar el servicio nos apoyamos en proveedores externos
            especializados, todos ellos vinculados por contratos de
            tratamiento de datos conformes al Art. 28 RGPD:
          </p>
          <ul>
            <li>
              <strong>Proveedor de procesamiento de pagos:</strong> gestiona
              el cobro del servicio premium y recoge directamente los datos
              de tarjeta en su propia plataforma.
            </li>
            <li>
              <strong>Proveedores de infraestructura técnica:</strong>{" "}
              prestan los servicios necesarios para generar y entregar la
              lectura, así como para alojar el sitio web.
            </li>
          </ul>
          <p>
            Algunos de estos proveedores están ubicados fuera de la Unión
            Europea, principalmente en EE. UU.
          </p>
          <p>
            Puedes solicitar la identidad concreta de cada sub-procesador
            escribiendo al correo de contacto indicado en la sección 1.
          </p>
        </>
      ),
    },
    {
      title: "6. Transferencias internacionales",
      body: (
        <p>
          Algunos de los sub-procesadores anteriores están ubicados en EE. UU.
          Las transferencias se amparan en las Cláusulas Contractuales Tipo
          (SCC) aprobadas por la Comisión Europea, que garantizan un nivel de
          protección equivalente al exigido por el RGPD.
        </p>
      ),
    },
    {
      title: "7. Plazo de conservación",
      body: (
        <ul>
          <li>
            <strong>Datos del pedido premium:</strong> máximo 24 horas desde
            la creación. Tras ese tiempo, se eliminan automáticamente.
          </li>
          <li>
            <strong>Contador de rate limiting:</strong> máximo 1 hora.
          </li>
          <li>
            <strong>Logs operativos:</strong> aproximadamente 30 días.
          </li>
          <li>
            <strong>Datos contables y fiscales:</strong> el plazo legal
            establecido (hasta 4 años conforme al Art. 66 de la Ley General
            Tributaria) cuando se generan facturas formales.
          </li>
          <li>
            <strong>Datos en el procesador de pagos:</strong> conforme a su
            propia política y a las obligaciones legales aplicables a un
            proveedor de servicios de pago.
          </li>
        </ul>
      ),
    },
    {
      title: "8. Tus derechos",
      body: (
        <>
          <p>
            Conforme al RGPD y la LOPDGDD, puedes ejercer en cualquier momento
            los siguientes derechos:
          </p>
          <ul>
            <li>
              <strong>Acceso:</strong> saber qué datos tuyos tratamos.
            </li>
            <li>
              <strong>Rectificación:</strong> corregir datos inexactos.
            </li>
            <li>
              <strong>Supresión:</strong> borrar tus datos cuando ya no sean
              necesarios.
            </li>
            <li>
              <strong>Limitación:</strong> restringir temporalmente el
              tratamiento.
            </li>
            <li>
              <strong>Oposición:</strong> oponerte al tratamiento por motivos
              relativos a tu situación particular.
            </li>
            <li>
              <strong>Portabilidad:</strong> recibir tus datos en formato
              estructurado y legible por máquina.
            </li>
            <li>
              <strong>No ser objeto de decisiones automatizadas</strong> con
              efectos jurídicos o significativos (ver sección 9).
            </li>
          </ul>
          <p>
            Para ejercerlos, envía un correo a{" "}
            <a href="mailto:galgoastral.tiny242@passinbox.com">
              galgoastral.tiny242@passinbox.com
            </a>{" "}
            indicando el derecho que deseas ejercer y adjuntando documento que
            acredite tu identidad. Responderemos en un plazo máximo de 30 días
            naturales.
          </p>
        </>
      ),
    },
    {
      title: "9. Decisiones automatizadas e inteligencia artificial",
      body: (
        <p>
          La lectura astrológica se genera mediante un modelo de inteligencia
          artificial. El resultado tiene carácter
          simbólico y de entretenimiento, y no produce efectos jurídicos ni
          significativos sobre el usuario. Por tanto, no resulta de aplicación
          el régimen reforzado del Art. 22 RGPD. En cualquier caso, puedes
          solicitar revisión humana, expresar tu punto de vista o impugnar el
          resultado escribiendo al correo de contacto.
        </p>
      ),
    },
    {
      title: "10. Reclamación ante la autoridad de control",
      body: (
        <p>
          Si consideras que el tratamiento de tus datos no se ajusta a la
          normativa vigente, tienes derecho a presentar una reclamación ante la
          Agencia Española de Protección de Datos (AEPD):{" "}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.aepd.es
          </a>
          .
        </p>
      ),
    },
    {
      title: "11. Cambios en esta política",
      body: (
        <p>
          Cualquier modificación se publicará en esta misma página, indicando
          la fecha de actualización en la cabecera. Te recomendamos revisarla
          periódicamente.
        </p>
      ),
    },
  ],
};

const CONTENT_EN: LegalContent = {
  title: "Privacy Policy",
  lastUpdatedLabel: "LAST UPDATED",
  lastUpdated: "May 18, 2026",
  intro: (
    <p>
      This policy describes what personal data we process when you use
      galgoastral.com, for what purpose, for how long, and what rights you
      have under the EU General Data Protection Regulation (GDPR) and the
      Spanish Organic Law 3/2018 (LOPDGDD).
    </p>
  ),
  sections: [
    {
      title: "1. Data controller",
      body: (
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
            <strong>Contact email:</strong>{" "}
            <a href="mailto:galgoastral.tiny242@passinbox.com">
              galgoastral.tiny242@passinbox.com
            </a>
          </li>
        </ul>
      ),
    },
    {
      title: "2. Personal data we process",
      body: (
        <>
          <p>We process the following categories of data:</p>
          <ul>
            <li>
              <strong>Natal form data:</strong> name (optional), date of
              birth, time of birth (optional), place of birth (optional),
              focus of interest (love or general life) and preferred language.
            </li>
            <li>
              <strong>Pet form data</strong> (only if you purchase the premium
              reading): name, species (dog or cat), date of birth or
              adoption, declared gender, personality traits and relationship
              focus.
            </li>
            <li>
              <strong>Payment data:</strong> handled directly by Stripe on its
              own platform. Galgoastral.com{" "}
              <strong>never stores or accesses</strong> the card number, CVC
              or banking details.
            </li>
            <li>
              <strong>Technical data:</strong> IP address, user agent, date
              and time of visit. Used for rate limiting and operational logs.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "3. Purpose of processing",
      body: (
        <ul>
          <li>
            Generate the requested symbolic astrological interpretation
            (natal chart and, if applicable, pet compatibility).
          </li>
          <li>
            Process the premium payment through Stripe and meet accounting
            and tax obligations.
          </li>
          <li>
            Prevent abuse of the service through rate limiting per IP
            address.
          </li>
          <li>Handle user requests related to the exercise of their rights.</li>
        </ul>
      ),
    },
    {
      title: "4. Legal basis",
      body: (
        <ul>
          <li>
            <strong>Performance of a contract</strong> (Art. 6.1.b GDPR) — to
            deliver the service and process the payment.
          </li>
          <li>
            <strong>Legitimate interest</strong> (Art. 6.1.f GDPR) — to
            prevent abuse and ensure service security (rate limiting).
          </li>
          <li>
            <strong>Compliance with a legal obligation</strong> (Art. 6.1.c
            GDPR) — to keep accounting and tax records.
          </li>
        </ul>
      ),
    },
    {
      title: "5. Data processors (sub-processors)",
      body: (
        <>
          <p>
            To deliver the service we rely on specialised external
            providers, all of whom have data processing agreements compliant
            with Art. 28 GDPR:
          </p>
          <ul>
            <li>
              <strong>Payment processor:</strong> handles the premium
              service charge and collects card data directly on its own
              platform.
            </li>
            <li>
              <strong>Technical infrastructure providers:</strong> deliver
              the services necessary to generate and serve the reading, as
              well as to host the website.
            </li>
          </ul>
          <p>
            Some of these providers are located outside the European Union,
            primarily in the United States.
          </p>
          <p>
            You may request the specific identity of each sub-processor by
            writing to the contact email shown in section 1.
          </p>
        </>
      ),
    },
    {
      title: "6. International transfers",
      body: (
        <p>
          Some of the sub-processors above are located in the United States.
          Transfers are protected by Standard Contractual Clauses (SCC)
          approved by the European Commission, which guarantee a level of
          protection equivalent to that required by the GDPR.
        </p>
      ),
    },
    {
      title: "7. Retention period",
      body: (
        <ul>
          <li>
            <strong>Premium order data:</strong> maximum 24 hours from
            creation. After that, the data is automatically deleted.
          </li>
          <li>
            <strong>Rate limit counters:</strong> maximum 1 hour.
          </li>
          <li>
            <strong>Operational logs:</strong> approximately 30 days.
          </li>
          <li>
            <strong>Accounting and tax data:</strong> the legally required
            period (up to 4 years under Art. 66 of the Spanish General Tax
            Law) when formal invoices are issued.
          </li>
          <li>
            <strong>Data held by the payment processor:</strong> as per its
            own policy and the legal obligations applicable to a payment
            services provider.
          </li>
        </ul>
      ),
    },
    {
      title: "8. Your rights",
      body: (
        <>
          <p>
            Under the GDPR and LOPDGDD, you may exercise the following rights
            at any time:
          </p>
          <ul>
            <li>
              <strong>Access:</strong> know what data we hold about you.
            </li>
            <li>
              <strong>Rectification:</strong> correct inaccurate data.
            </li>
            <li>
              <strong>Erasure:</strong> delete your data when no longer
              necessary.
            </li>
            <li>
              <strong>Restriction:</strong> temporarily limit processing.
            </li>
            <li>
              <strong>Objection:</strong> object to processing based on your
              particular situation.
            </li>
            <li>
              <strong>Portability:</strong> receive your data in a structured,
              machine-readable format.
            </li>
            <li>
              <strong>Not be subject to automated decisions</strong> with
              legal or significant effects (see section 9).
            </li>
          </ul>
          <p>
            To exercise your rights, send an email to{" "}
            <a href="mailto:galgoastral.tiny242@passinbox.com">
              galgoastral.tiny242@passinbox.com
            </a>{" "}
            stating which right you wish to exercise and attaching a document
            proving your identity. We will respond within a maximum of 30
            calendar days.
          </p>
        </>
      ),
    },
    {
      title: "9. Automated decisions and artificial intelligence",
      body: (
        <p>
          The astrological reading is generated by an artificial intelligence
          model. The result is symbolic and intended
          for entertainment, and does not produce legal or significant
          effects on the user. Therefore, the enhanced regime of Art. 22 GDPR
          does not apply. In any case, you may request human review, express
          your point of view or challenge the result by writing to the
          contact email.
        </p>
      ),
    },
    {
      title: "10. Complaint to the supervisory authority",
      body: (
        <p>
          If you consider that the processing of your data does not comply
          with applicable law, you have the right to lodge a complaint with
          the Spanish Data Protection Agency (AEPD):{" "}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.aepd.es
          </a>
          .
        </p>
      ),
    },
    {
      title: "11. Changes to this policy",
      body: (
        <p>
          Any modification will be published on this same page, with the
          updated date shown in the header. We recommend reviewing it
          periodically.
        </p>
      ),
    },
  ],
};

export default async function PrivacidadPage({ searchParams }: Props) {
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
