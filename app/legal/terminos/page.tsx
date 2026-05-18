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
  title: "Galgo Astral · Términos y Condiciones",
  description:
    "Términos y condiciones de uso del servicio Galgo Astral, incluyendo precio, política de reembolso y limitación de responsabilidad.",
};

const CONTENT_ES: LegalContent = {
  title: "Términos y Condiciones",
  lastUpdatedLabel: "ÚLTIMA ACTUALIZACIÓN",
  lastUpdated: "18 de mayo de 2026",
  intro: (
    <p>
      Estos Términos y Condiciones regulan el acceso y uso del servicio
      ofrecido en galgoastral.com. Al utilizar el sitio, aceptas estos
      términos en su totalidad.
    </p>
  ),
  sections: [
    {
      title: "1. Identidad del prestador",
      body: (
        <p>
          El servicio es prestado por Pau H. Maravi Busquets (NIF 37342698J),
          con domicilio en Islas Baleares, España. Información completa en el{" "}
          <a href="/legal/aviso-legal">Aviso Legal</a>.
        </p>
      ),
    },
    {
      title: "2. Objeto",
      body: (
        <>
          <p>El servicio comprende dos productos diferenciados:</p>
          <ul>
            <li>
              <strong>Lectura de carta astral natal:</strong> interpretación
              simbólica gratuita generada a partir de los datos de nacimiento
              proporcionados por el usuario.
            </li>
            <li>
              <strong>Lectura de compatibilidad astral con mascota:</strong>{" "}
              lectura simbólica del vínculo entre el usuario y su mascota,
              ofrecida como producto digital de pago al precio indicado en el
              propio servicio.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "3. Precio y forma de pago",
      body: (
        <>
          <p>
            El precio actual de la lectura de compatibilidad con mascota es de{" "}
            <strong>2,99 € (IVA incluido)</strong>, en un único pago. El pago
            se procesa íntegramente a través de Stripe, que recoge los datos
            de la tarjeta directamente en su plataforma segura. El prestador
            del servicio no almacena ni accede a información bancaria del
            usuario.
          </p>
          <p>
            Podrás recibir factura simplificada bajo solicitud expresa al
            correo de contacto, indicando los datos fiscales necesarios.
          </p>
        </>
      ),
    },
    {
      title: "4. Naturaleza del servicio",
      body: (
        <p>
          Las lecturas ofrecidas son <strong>interpretaciones simbólicas</strong>{" "}
          generadas mediante un modelo de inteligencia artificial. Tienen
          finalidad de entretenimiento, reflexión personal e inspiración. No
          constituyen consejo médico, psicológico, financiero, jurídico ni de
          ningún otro tipo profesional, ni sustituyen la valoración de un
          veterinario, terapeuta, asesor o cualquier otro profesional
          colegiado. El usuario asume plena responsabilidad de las decisiones
          que pueda tomar basándose en la información recibida.
        </p>
      ),
    },
    {
      title: "5. Edad mínima",
      body: (
        <p>
          El servicio está dirigido a personas mayores de 16 años, de acuerdo
          con el Art. 7 de la Ley Orgánica 3/2018 (LOPDGDD). El usuario
          declara, al utilizar el servicio, ser mayor de esa edad.
        </p>
      ),
    },
    {
      title: "6. Propiedad intelectual de la lectura",
      body: (
        <p>
          Se concede al usuario una licencia personal, no exclusiva y no
          transferible para uso privado del texto interpretativo generado. Se
          permite citarlo en contextos no comerciales con atribución a la
          fuente. Queda prohibida su reproducción comercial, venta o
          incorporación en productos derivados sin autorización expresa del
          prestador.
        </p>
      ),
    },
    {
      title:
        "7. Exclusión del derecho de desistimiento",
      body: (
        <>
          <p>
            Conforme al Art. 103.m) del Real Decreto Legislativo 1/2007, Texto
            Refundido de la Ley General para la Defensa de los Consumidores y
            Usuarios (TRLGDCU), el derecho de desistimiento no resulta de
            aplicación a los contratos de suministro de contenido digital no
            prestado en un soporte material cuando la ejecución haya
            comenzado con el consentimiento previo expreso del consumidor y
            con el conocimiento por su parte de que pierde así su derecho de
            desistimiento.
          </p>
          <p>
            Al confirmar el pago, el usuario consiente expresamente que la
            generación de la lectura comience de manera inmediata y reconoce
            que, en consecuencia,{" "}
            <strong>pierde el derecho de desistimiento</strong> sobre el
            servicio digital personalizado adquirido. Esta aceptación se
            recoge mediante una casilla específica antes de proceder al pago.
          </p>
        </>
      ),
    },
    {
      title: "8. Reembolsos por fallos técnicos",
      body: (
        <p>
          Si por causa técnica imputable al prestador la lectura no se
          generase o resultase corrupta, el usuario podrá solicitar un
          reembolso íntegro escribiendo al correo de contacto en un plazo de
          14 días desde el pago, indicando el identificador de la sesión de
          Stripe. La insatisfacción con el contenido subjetivo de la lectura
          no constituye fallo técnico y no da derecho a reembolso.
        </p>
      ),
    },
    {
      title: "9. Limitación de responsabilidad",
      body: (
        <p>
          El servicio se ofrece tal cual y según disponibilidad. El prestador
          no garantiza la disponibilidad continua, ni la ausencia de errores
          o interrupciones por causas técnicas, de fuerza mayor o ajenas a su
          control. La responsabilidad del prestador, en cualquier caso, queda
          limitada al importe efectivamente abonado por el usuario por el
          servicio premium en la transacción concreta.
        </p>
      ),
    },
    {
      title: "10. Modificaciones del servicio",
      body: (
        <p>
          El prestador podrá modificar, añadir o eliminar funcionalidades del
          servicio en cualquier momento, sin que ello dé lugar a indemnización
          alguna. Los cambios no tendrán efecto retroactivo sobre lecturas ya
          adquiridas.
        </p>
      ),
    },
    {
      title: "11. Ley aplicable y jurisdicción",
      body: (
        <p>
          Los presentes términos se rigen por la legislación española. Para
          cualquier controversia, serán competentes los Juzgados y Tribunales
          del domicilio del consumidor, conforme al Art. 90.2 del TRLGDCU.
        </p>
      ),
    },
    {
      title: "12. Cambios en los términos",
      body: (
        <p>
          Cualquier modificación se publicará en esta misma página, indicando
          la fecha de actualización en la cabecera. Las modificaciones no
          afectarán a contratos ya celebrados antes de su publicación.
        </p>
      ),
    },
  ],
};

const CONTENT_EN: LegalContent = {
  title: "Terms and Conditions",
  lastUpdatedLabel: "LAST UPDATED",
  lastUpdated: "May 18, 2026",
  intro: (
    <p>
      These Terms and Conditions govern access to and use of the service
      offered at galgoastral.com. By using the site, you accept these terms
      in their entirety.
    </p>
  ),
  sections: [
    {
      title: "1. Service provider identity",
      body: (
        <p>
          The service is provided by Pau H. Maravi Busquets (Tax ID
          37342698J), domiciled in the Balearic Islands, Spain. Full details
          in the <a href="/legal/aviso-legal?lang=en">Legal Notice</a>.
        </p>
      ),
    },
    {
      title: "2. Object",
      body: (
        <>
          <p>The service comprises two distinct products:</p>
          <ul>
            <li>
              <strong>Natal chart reading:</strong> free symbolic
              interpretation generated from the birth data provided by the
              user.
            </li>
            <li>
              <strong>Pet astral compatibility reading:</strong> symbolic
              reading of the bond between the user and their pet, offered as
              a paid digital product at the price shown in the service
              itself.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "3. Price and payment",
      body: (
        <>
          <p>
            The current price of the pet compatibility reading is{" "}
            <strong>€2.99 (VAT included)</strong>, as a one-time payment.
            Payment is processed entirely through Stripe, which collects card
            data directly on its secure platform. The service provider does
            not store or access the user’s banking information.
          </p>
          <p>
            You may request a simplified invoice by writing to the contact
            email and providing the required tax details.
          </p>
        </>
      ),
    },
    {
      title: "4. Nature of the service",
      body: (
        <p>
          The readings offered are{" "}
          <strong>symbolic interpretations</strong> generated by an
          artificial intelligence model. They are intended for
          entertainment, personal reflection and inspiration. They do not
          constitute medical, psychological, financial, legal or any other
          professional advice, nor do they replace the assessment of a
          veterinarian, therapist, advisor or any other accredited
          professional. The user assumes full responsibility for any
          decisions made based on the information received.
        </p>
      ),
    },
    {
      title: "5. Minimum age",
      body: (
        <p>
          The service is intended for persons aged 16 and over, in accordance
          with Art. 7 of Spanish Organic Law 3/2018 (LOPDGDD). By using the
          service, the user declares to be over that age.
        </p>
      ),
    },
    {
      title: "6. Intellectual property of the reading",
      body: (
        <p>
          A personal, non-exclusive and non-transferable licence is granted
          to the user for private use of the interpretive text generated.
          Quoting it in non-commercial contexts with attribution to the
          source is permitted. Commercial reproduction, sale or incorporation
          into derivative products without express authorisation of the
          provider is prohibited.
        </p>
      ),
    },
    {
      title: "7. Waiver of the right of withdrawal",
      body: (
        <>
          <p>
            In accordance with Art. 103.m) of Royal Legislative Decree 1/2007
            (Consolidated Text of the Spanish Consumer Protection Law,
            TRLGDCU), the right of withdrawal does not apply to contracts
            for the supply of digital content not delivered on a tangible
            medium when performance has begun with the consumer’s prior
            express consent and acknowledgment that they thereby lose their
            right of withdrawal.
          </p>
          <p>
            By confirming payment, the user expressly consents to immediate
            commencement of the reading and acknowledges that they thereby{" "}
            <strong>waive the right of withdrawal</strong> over the
            personalised digital service purchased. This acceptance is
            collected through a specific checkbox before proceeding to
            payment.
          </p>
        </>
      ),
    },
    {
      title: "8. Refunds for technical failures",
      body: (
        <p>
          If, due to a technical cause attributable to the provider, the
          reading is not generated or is corrupted, the user may request a
          full refund by writing to the contact email within 14 days of
          payment, indicating the Stripe session identifier. Dissatisfaction
          with the subjective content of the reading does not constitute a
          technical failure and does not grant a right to refund.
        </p>
      ),
    },
    {
      title: "9. Limitation of liability",
      body: (
        <p>
          The service is offered as-is and subject to availability. The
          provider does not guarantee continuous availability, nor the
          absence of errors or interruptions due to technical reasons, force
          majeure or causes beyond its control. In any case, the provider’s
          liability is limited to the amount actually paid by the user for
          the specific premium transaction.
        </p>
      ),
    },
    {
      title: "10. Modifications to the service",
      body: (
        <p>
          The provider may modify, add or remove service features at any
          time, without entitling the user to any compensation. Changes
          shall not be retroactive over readings already purchased.
        </p>
      ),
    },
    {
      title: "11. Applicable law and jurisdiction",
      body: (
        <p>
          These terms are governed by Spanish law. For any dispute, the
          courts of the consumer’s domicile shall be competent, in
          accordance with Art. 90.2 of the TRLGDCU.
        </p>
      ),
    },
    {
      title: "12. Changes to these terms",
      body: (
        <p>
          Any modification will be published on this same page, with the
          updated date shown in the header. Changes shall not affect
          contracts already entered into before their publication.
        </p>
      ),
    },
  ],
};

export default async function TerminosPage({ searchParams }: Props) {
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
