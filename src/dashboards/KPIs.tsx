interface KPIsProps {
    kpiMap: {[key: string]: string}
}

const KPIs = ({kpiMap}: KPIsProps)=> {
    return (
        <>
            <h2 className="font-bold text-4xl w-full">KPIs</h2>
            <section className="w-full flex gap-x-10 overflow-x-auto py-3">
            {
                Object.entries(kpiMap).map(([k, v]) =>
                <div className="grid grid-rows-2" key={k}>
                    <div className="flex items-end">
                        <h3 className="font-bold text-lg">{k}</h3>

                    </div>
                    <p className="text-2xl text-blue-800 font-bold">{v}</p>
                </div>
    )
            }
            </section>
        </>
    )
}

export default KPIs