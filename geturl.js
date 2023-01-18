export function geturl(url) {
    let shortUrl = []
    for (let i = 0; i < 5; i++) {
        if (url.length > 10) {
            shortUrl.push(url[Math.floor(Math.random() * 5) + 15])

        } else {
            shortUrl.push(url[i])
        }
    }
    return shortUrl.join("")
}

// geturl("http://:sakthivel.com".split(""))