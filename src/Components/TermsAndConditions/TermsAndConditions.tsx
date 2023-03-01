
import { useEffect, useState } from "react";
import { getLogo } from "../../services/nsGeneralService";
import "./TermsStyles.scss"

export default function Terms(){

    const [src,setSrc]=useState("/imgs/");
    //const [defaultLogo,setDefaultLogo]=useState("/img/graylogo.png");
    const [logo,setLogo]=useState(false);
    let logoBoolean=false;

    useEffect(()=>{
        if(!logoBoolean){
            setLogo(true);
            logoBoolean=true;
            getLogo().then(res=>{
                setSrc(src+res);
            })
        }
        
    },[]) 

return (
    <div className="TermsContainer textDark">	
        <div>
        {logo && <img src={src}  className="TermImage" alt="Logo"/>}
            </div>
            <br/>
        <p><strong>CONSENTIMIENTO INFORMADO PARA TELEMEDICINA</strong></p>
        <br/>
        <p>El presente consentimiento informado, para uso de telemedicina, está redactado teniendo en cuenta las siguientes leyes y normativas nacionales:</p>
        <ul className="unorderedList">
        <br/>
        <li>Autenticación de la veracidad de los datos y de la identidad de los profesionales intervinientes (Ley N° 25.506 - Ley de Firma digital)</li>
        <li>Implementación de mecanismos de protección, obtención y seguridad de&nbsp; datos&nbsp;-Ley de Protección de los Datos Personales (Ley N° 25.326).</li>
        <li>Resguardo del acceso y provisión de datos a partir de la historia clínica electrónica (Ley 26.529 Derechos del paciente, historia clínica y Consentimiento Informado)</li>
        </ul><br/>
        <p className="textDarkItalic">&nbsp;Nota: En caso de pacientes menores de 13 años, o mayores con discapacidad verbal o auditiva que les impida leer y aceptar este documento, lo hará un representante debidamente identificado, debiendo dejar constancia de nombre, DNI, teléfono en el consentimiento ON Line, y acercarse luego al centro a firmar el consentimiento.</p>
        <br/>
        <p className="textDarkItalic">Nota II: Es importante señalar que la seguridad de la información, que es posterior a la recolección del dato, no protege de las posibles vulneraciones que la obtención del dato puede ocasionar, del mismo modo que ocurre durante una consulta presencial.</p>
        <br/>
        <p><strong>Información General</strong>&nbsp;</p>
        <br/>
        <p>La teleconsulta corresponde a una consulta a la distancia realizada a través de tecnologías de la información y telecomunicaciones entre un paciente y uno (o más) miembro(s) del equipo de salud que se encuentran respectivamente ubicados en lugares geográfico distintos respecto del paciente y que tienen la posibilidad de interactuar entre sí.</p>
        <br/>
        <p>Su principal beneficio durante la presente situación de emergencia sanitaria por COVID-19 es permitir que un paciente permanezca en un sitio remoto mientras recibe atención profesional de un proveedor de atención médica, sin exponerse al riesgo de contagio.</p>
        <p>Además, puede ser utilizada ante la ausencia de especialistas en lugares remotos o sin acceso a profesionales de la salud.</p>
        <p>Es, al mismo tiempo, una herramienta de interconsulta entre los médicos del centro de salud que fuera de la situación de emergencia, permitirá reducir el desplazamiento de pacientes hacia los centros de salud, cuando la consulta debido a su baja complejidad, no requiere del acto presencial.</p>
        <br/>
        <p>Le estamos ofreciendo el presente consentimiento informado, cuya aceptación implica la acabada comprensión de la información respecto de la telemedicina, así como sus alcances y reglas de uso.</p>
        <br/>
        <p>La teleconsulta presenta los siguientes riesgos y limitaciones:</p>
        <br/>
        <ul className="unorderedList">
        <li>No reemplaza la atención presencial, toda vez que carece de la posibilidad de efectuar examen físico.</li>
        <li>Puede verse alterada por dificultades tecnológicas.</li>
        <li>En ausencia de la posibilidad de hacer un examen físico, no sería posible establecer con exactitud diagnósticos, ni tampoco prescripción certera de tratamiento, por lo que es posible que el paciente sea derivado a una consulta presencial</li>
        </ul>
        <br/>
        <p><strong>Por el presente documento entiendo que:</strong></p>
        <br/>
        <div className="unorderedParagraphList">
            <p><strong>1)</strong> Accedo a compartir mi información por vía tecnológica, con un profesional que será el receptor de la misma.</p>
            <p><strong>2)</strong> Entiendo que el centro de salud ha tomado las medidas necesarias para proteger y resguardar la privacidad o confidencialidad de la información brindad por mí.&nbsp; (Ley N° 25.506) (Ley N° 25.326)( Ley 26.529)</p>
            <p><strong>3)</strong> No debo tomar la teleconsulta desde un lugar público, con ningún dispositivo electrónico. Me comprometo&nbsp; a utilizar, al inicio y durante toda la realización de la teleconsulta un lugar&nbsp; donde se respete la privacidad y entiendo que, para la realización de la misma, el profesional estará en su consultorio, atendiendo a mi turno programado de teleconsulta, respetando también mi privacidad.</p>
            <p><strong>4)</strong> Comprendo que la teleconsulta, no puede reemplazar salvo parcialmente la atención presencial y que podría ser incompleta porque carece de la realización del examen físico, y que debo presentarme al centro de salud o a una guardia si el profesional así me lo indica en la teleconsulta.</p>
            <p><strong>5)</strong> Entiendo que la comunicación podría verse alterada por fallas tecnológicas, ajenas a la voluntad de mi tratante, y que se implementarán los medios necesarios para retomar la misma en el menor tiempo posible.</p>
            <p><strong>6)</strong> Consiento &nbsp;que una parte de la transmisión de información sea grabada, como forma de registro auditable por el centro médico y los financiadores. La institución se encargará&nbsp; de velar por&nbsp; la seguridad y confidencialidad de la misma aunque en casos excepcionales y ajenos a su voluntad podría verse vulnerada.</p>
            <p><strong>7)</strong> Comprendo que los diagnósticos que se me brinden estén efectuados sobre la base de antecedentes incompletos y que, por ello&nbsp; , podrían generarse errores en su planteamiento.</p>
            <p><strong>8)</strong>&nbsp;En relación a lo anterior y considerando la justificación de realizar la teleconsulta, me comprometo&nbsp; , cuando las circunstancias lo permitan, a consultar a un especialista en forma presencial.</p>
            <p><strong>9)</strong>&nbsp;Entiendo que en todo momento durante la realización de la teleconsulta puedo revocar mi consentimiento, optando en cualquier momento por dar concluida la teleconsulta y optando por la atención presencial, para lo cual el médico me pedirá señalarlo expresamente y también quedará registro de ello, finalizando así la teleconsulta.</p>
            <p><strong>10)</strong>&nbsp;Entiendo que el presente consentimiento lo firmo la primera vez que realizo la teleconsulta, quedando implícita su aceptación para el resto de las consultas, hasta tanto no indique lo contrario.</p>
        </div>
        <br/>
        <p><strong>DESCRIPCIÓN DEL SERVICIO</strong></p>
        <br/>
        <p>El Centro, a través de su sitio, pone a disposición de sus pacientes, una plataforma electrónica de atenciones clínicas online, operada por el Centro, en conjunto con un proveedor externo, Advenio Software, donde los profesionales que trabajan en el Centro -acreditados por éste y en el Registro de Prestadores Acreditados de la Superintendencia de Servicios de Salud, ofrecen el servicio de atención clínica online (telemedicina), que incluye las siguientes prestaciones:</p>
        <br/>
        <p><strong>Consulta Médica y otras profesiones:</strong></p>
        <br/>
        <ul className="unorderedList">
        <li>La consulta de telemedicina es entregada por un Médico u otro profesional de la salud, enfocado en atención de enfermedades no complejas y en brindar orientaciones en salud. En esta modalidad, el profesional atiende al paciente mediante una video llamada, consiguiendo a través de esta plataforma, los antecedentes clínicos del paciente que sean requeridos para dar curso a la atención.</li>
        <li>La telemedicina tiene ciertas limitaciones, como el no poder realizar examen físico y <strong>no poder emitir algunos documentos como licencia médica.</strong></li>
        </ul>
        <ul className="unorderedList">
        <li ><strong className="red">El servicio excluye atenciones de Urgencia o Emergencia médica</strong>.
        <p>Nuestra recomendación es que usted ante una emergencia o urgencia médica no dude en acudir inmediatamente a nuestro establecimiento en forma presencial, o a un establecimiento de salud que pueda otorgar esta prestación.</p>
        </li>	
        </ul>
        <ul className="unorderedList">
        <li>La consulta por telemedicina, no reemplaza o sustituye, atención presencial o la relación con su médico de cabecera tratante o de atención primaria existente.</li>
        </ul>
        <br/>
        <p><strong>La Receta Médica:</strong><strong>&nbsp;</strong></p>
        <br/>
        <ul className="unorderedList">
        <li>En caso de que el criterio médico lo permita, al finalizar la atención, el paciente recibirá de parte del médico, una receta médica simple, para que pueda adquirir los medicamentos que requiera para el tratamiento indicado por el médico.</li>
        <li>Las recetas quedan guardadas en la historia clínica, y la misma será enviada por mail al paciente.</li>
        <li>La receta cuenta con un código QR, el cual, al ser leído por la farmacia, inhabilita a esa receta para ser utilizada en otra farmacia.</li>
        <li>Si el paciente realiza más de una impresión de cada receta, las mismas carecerán de validez, al ser anulado su código QR.</li>
        </ul>
        <br/>
        <p><strong>Certificados Médicos:</strong><strong>&nbsp;</strong></p>
        <br/>
        <ul className="unorderedList">
        <li>El médico podrá entregar al paciente certificados de atención médica, válido como justificativo para ser presentado en la Institución correspondiente. También podrá entregar certificados de derivaciones médicas.</li>
        <li><strong>Excluye licencia médica.</strong></li>
        </ul>
        <br/>
        <p><strong>Órdenes de examen:</strong><strong>&nbsp;</strong></p>
        <br/>
        <ul className="unorderedList">
        <li>El médico podrá emitir órdenes de examen, que permitan verificar, identificar o descartar un determinado diagnóstico.</li>
        <li>Los mismos serán remitidos por mail desde el centro.</li>
        <li>Pueden utilizarse medios electrónicos alternativos si las circunstancias lo requieran.</li>
        </ul>
        <br/>
        <div className="exclutions">
        <p>&nbsp;<strong>EXCLUSIONES DEL SERVICIO</strong><strong>&nbsp;</strong></p>
        <br/>
        
        La atención clínica online <strong>NO</strong> incluye dentro de sus prestaciones de salud exámenes complementarios médicos, procedimientos y/o tratamientos de enfermería, curaciones avanzadas, manejo de sondas, ostomías y otras prestaciones de carácter presencial.
        
        </div>
        <br/>
        <p><strong>VALOR DEL SERVICIO DE TELEMEDICINA</strong>&nbsp;</p>
        <br/>
        <p>El valor del servicio de atención clínica online deberá ser abonado <strong>antes</strong> de recibir la atención por teleconsulta, pudiendo utilizar las opciones de pago que estarán disponibles una vez realizada la solicitud del turno de consulta (MercadoPago)</p>
        <br/>
        <p>La forma de cobro de cada profesional, así como el valor de la consulta, es potestad de cada uno de los profesionales, no siendo ni la determinación del honorario ni el cobro del mismo una facultad del Centro.</p>
        <br/>
        <p>La cobertura de telemedicina depende de la especialidad, de acuerdo a las normativas vigentes.</p>
        <p>Cada profesional, se reserva el derecho de modificar los precios de telemedicina cuando estime pertinente, y dicha información estará disponible ANTES que el paciente tome el turno.</p>
        <br/>
        <p>Al inicio de la teleconsulta el médico me consultará si está&nbsp; de acuerdo o no con los términos del presente protocolo de consentimiento, el cual quedará <strong>registrado ON LINE</strong>. El registro se hará por única vez, y dentro de las primeras 4 semanas, el paciente deberá hacer llegar al centro el presente consentimiento firmado, o puede acercarse al Centro a firmarlo. Es responsabilidad del paciente dejar la copia por escrito. El profesional también firmará el consentimiento, tanto en su forma on line, mediante la firma digital, así como la copia escrita que el paciente haga llegar al Centro.</p>
        <br/>
        <p>Si los medios tecnológicos lo permiten y habiendo leído el presente consentimiento, comprendiendo los alcances y las limitaciones de la telemedicina, procederé a firmarlo y entregarlo vía remota al médico. Si por alguna razón no pudiese enviarlo al profesional, o acercarme al Centro a firmar el presente consentimiento,&nbsp; entiendo que la aceptación <strong>ON LINE</strong> del mismo es suficiente para realizar la teleconsulta, conforme la Ley vigente. (Ley 26.529 Derechos del paciente, historia clínica y Consentimiento Informado)</p>
        <br/>
        <p>El profesional que otorgue la atención dejará consignado en la historia clínica, mi aceptación de las condiciones precedentes.</p>
        <p>&nbsp;</p>
    </div>
)

}