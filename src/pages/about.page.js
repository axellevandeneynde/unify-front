import Title from "../components/title";

export default function AboutPage() {
    return (
        <div className="about-page">
            <Title title="Over Unify" color="yellow"></Title>
            <section className="col-md-offset-3 col-md-8">
                <div className="video-container">
                    <iframe
                        src="https://www.youtube.com/embed/SHKbDMgmof8"
                        title="YouTube video player"
                        frameborder="0" />
                </div>

            </section>
        </div>
    )
}