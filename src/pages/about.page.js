import Title from "../components/title";

export default function AboutPage() {
    return (
        <div className="about-page">
            <Title title="Over Unify" color="yellow"></Title>
            <section className="col-md-offset-3 col-md-8 col-xs-12">
                <div className="video-container">
                    <iframe
                        src="https://www.youtube.com/embed/SHKbDMgmof8"
                        title="YouTube video player"
                        frameborder="0" />
                </div>
            </section>
            <section className="col-md-offset-3 col-md-8 col-xs-12" id="trust">
                <h2 className="title">Betrouwbaarheidsanalyses</h2>
                <p>er is gezocht naar een betrouwbare methode om betrouwbaarheid van nieuws te kwantificeren. De zoektocht leverde ‘The Trust Project’ op. ‘Het Trust Project is een internationaal consortium van nieuwsorganisaties die normen   voor transparantie ontwikkelen en samenwerken met technologieplatforms om de toewijding van de journalistiek aan transparantie, nauwkeurigheid, inclusie en eerlijkheid te bevestigen en te versterken, zodat het publiek geïnformeerde nieuwskeuzes kan maken’ (The Trust Project, 2021). Dit project wordt ondersteund door grote nieuwsmerken over de hele wereld en gefinancierd door Craig Newmark Philanthropies, Goog le, the Democracy Fund, the John S. en James L. Knight Foundation en the Markkula Foundation  (The trust project, 2021).
                The Trust Project creëerde betrouwbaarheidsindicatoren. Deze indicatoren kwamen tot stand door diepte interviews met nieuwsconsumenten over wat ze waarderen in nieuws te fusioneren met journalistieke waardes. Dit werd   gedaan in samenwerking met editors van  nieuwsmerken zoals New York Times, The Guardian en El Universal (Lehrman, 2012).
                De betrouwbaarheidsscore wordt op een schaal van tien gegeven en wordt onderverdeeld in drie kleurcategorieën. Een score van zeven of hoger kleurt groen, tussen vier en zeven geel en voor vier of minder roze. Voor een extra ondersteuning aan de gebruikers is er ook een indicator voor duidelijk gekleurde nieuwsbronnen. Dit zijn nieuwsbronnen  die in de inhoud van hun berichtgeving en/of in hun visie blijk  geven van een politieke voorkeur.
</p>
                <p>Een overzicht van deze betrouwbaarheidsindicatoren kan u <a href="https://thetrustproject.org/wp-content/uploads/2020/07/7.29.20The-Trust-Indicators-Handout.pdf" className="link">hier</a> terugvinden.</p>
            </section>
        </div>
    )
}