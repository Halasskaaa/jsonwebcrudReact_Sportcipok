type CipokProps = {
    marka: string;
    ar: number;
    vane: boolean;
    kiallitas: Date;
}

export default function CipokKiiratasa(props: CipokProps) {
    return <>
        <div>
            <h1>Cipők</h1>
            <h2>Cipők listája</h2>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Márka</th>
                        <th>Ár</th>
                        <th>Van-e</th>
                        <th>Kiállítás</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.marka}</td>
                        <td>{props.ar}</td>
                        <td>{props.vane}</td>
                        <td>{props.kiallitas.toLocaleDateString("hu-HU")}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}