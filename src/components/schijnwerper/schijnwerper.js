import Title from '../title';

export default function Schijnwerper() {
    return (
        <div className="schijnwerper body-padding">
            <Title title="In de schijnwerper" icon="highlight" color="yellow"></Title>
            <div className="row">
                <p className='text-intro col-md-offset-3 col-md-6'>Dagelijks manueel geselecteerd zodat je omvangrijke nieuws items niet zou missen en je horizon kan verbreden. </p>
            </div>
        </div>
    )
}