
export default function jsonp(obj) {
    var {url, data, success} = obj
    var target = document.getElementsByTagName('script')[0] || document.head;
    var script = document.createElement('script')
    var a = ''
    window.success = function(data) {
        success(data)
        cleanUp()
    }
    data = {
        ...data
    }
    for (var i in data) {
        a += '&' + i + '=' + data[i]
    }
    url += '?' + a.slice(1)
    script.src = url
    target.parentNode.insertBefore(script, target);
    function cleanUp() {
        if (script.parentNode) script.parentNode.removeChild(script);
    }
}
// o = {
//     48: "C200%(mid)",
//     96: "C400%(mid)",
//     128: "M500%(mid)",
//     320: "M800%(mid)"
// }
//   , l = {
//     111: "C4L0%(mid)",
//     112: "R400%(mid)",
//     113: "KC40%(mid)"
// }
//   , s = {
//     48: "L200%(mid).m4a",
//     96: "L400%(mid).m4a",
//     128: "L500%(mid).mp3"
// }
//https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg