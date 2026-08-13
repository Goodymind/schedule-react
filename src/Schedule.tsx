import './Schedule.css'

type CardData = { title: string; rowSpan?: number; type?: string; details?: string };
const rows: number = 31;
const cols: number = 7;
const cardData: CardData[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ title: "", rowSpan: 1, type: "", details: "" }))
);

cardData[0][0] = { title: "Time", type: "header" };
cardData[0][1] = { title: "Mon", type: "header" };
cardData[0][2] = { title: "Tue", type: "header" };
cardData[0][3] = { title: "Wed", type: "header" };
cardData[0][4] = { title: "Thu", type: "header" };
cardData[0][5] = { title: "Fri", type: "header" };
cardData[0][6] = { title: "Sat", type: "header" };


const start_time = 7; //am
const end_time = 22; //pm
let current_time = start_time;
for (let index = 1; current_time < end_time; index++) {
    let start = current_time;

    let title = `${Math.floor(start)}:${(start % 1) === 0 ? "00" : "30"}`;
    cardData[index][0] = { title: title, type: "time" };
    current_time += 0.5;
}

cardData[3][1] = { title: "SocSc 14", rowSpan: 3, type: "class", details: "A BEL-206" };
cardData[3][4] = { title: "SocSc 14", rowSpan: 3, type: "class", details: "A BEL-206" };
cardData[12][1] = { title: "CSCI 70", rowSpan: 3, type: "class", details: "D CTC-506" };
cardData[12][4] = { title: "CSCI 70", rowSpan: 3, type: "class", details: "D CTC-506" };
cardData[6][2] = { title: "MSYS 121i", rowSpan: 3, type: "class", details: "K F-228" };
cardData[6][5] = { title: "MSYS 121i", rowSpan: 3, type: "class", details: "K F-228" };
cardData[18][2] = { title: "CSCI 180.05", rowSpan: 3, type: "class", details: "O CTC 215" };
cardData[18][5] = { title: "CSCI 180.05", rowSpan: 3, type: "class", details: "O CTC 215" };
cardData[13][5] = { title: "ISCS 30.57", rowSpan: 2, type: "class", details: "MF CTC 201C" };
cardData[3][6] = { title: "CSCI 60", rowSpan: 6, type: "class", details: "ST2B CTC 506" };


function Card({ title = "", rowSpan = 1, row = -1, col = -1, type = "", details = "", children }:
    { title?: string; rowSpan?: number; row?: number; col?: number; type?: string; details?: string; children?: React.ReactNode }) {

    let className = "card"

    if (row == -1 || col == -1)
        return (
            <div className={className} style={{ gridRow: `span ${rowSpan}` }}>
                <h3>{title}</h3>
            </div>
        )
    if (type !== "") {
        className = className + " " + type;
        // console.log(row, col, title);
    }
    if (type === "class") {

        return (
            <div className={className} style={{ gridRow: `${row + 1} / span ${rowSpan}`, gridColumn: ` ${col + 1} / span 1` }}>
                <img src={`https://teiostep.net/api/v1/images/skills/20013.png`} alt={type} />
                <h3>{title}</h3>
                <p>{details}</p>
            </div>
        )
    }
    return (
        <div className={className} style={{ gridRow: `${row + 1} / span ${rowSpan}`, gridColumn: ` ${col + 1} / span 1` }}>
            <h3>{title}</h3>

        </div>
    )
}


function Schedule() {

    const cardElements = [];

    let n = 0;
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            const data: CardData = cardData[j][i];
            // console.log(n, data.title);
            cardElements.push(
                <Card key={n} title={data.title} rowSpan={data.rowSpan} row={j} col={i} type={data.type} details={data.details}>
                </Card>
            )
            n++;
        }
    }

    return (
        <>
            <header>
                <h1><span id="yellow" data-text="Sche">Sche</span><span id="pink" data-text="dule">dule</span></h1>
                <h2 id="subtitle" data-text="ni Alinus">ni Alinus</h2>
            </header>
            <section id="calendar" style={{ gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${cols},1fr)` }}>
                {cardElements}
            </section>
        </>
    )
}

export default Schedule