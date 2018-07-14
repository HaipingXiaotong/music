const timeExp = /\[(\d{2,}):(\d{2,})(?:\.(\d{2,3}))?\]/g
export default function (data) {
    const lines = data.split('\n')
    let arr = []
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        let result = timeExp.exec(line)
        if (result) {
            const txt = line.replace(timeExp, '').trim()
            if (txt) {
                arr.push({
                    time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
                    txt
                })
            }
        }
    }
    return arr
}