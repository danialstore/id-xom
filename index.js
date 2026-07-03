const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/report', async (req, res) => {
    const { profileUrl, reason, cookies } = req.body;
    try {
        let username = profileUrl.match(/@([\w.]+)/)?.[1] || profileUrl.split('@').pop().split('?')[0];
        const reportUrl = 'https://www.tiktok.com/aweme/v2/aweme/feedback/?WebIdLastTime=1782599817&aid=1988&app_language=en&app_name=tiktok_web&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=MacIntel&browser_version=5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36&channel=tiktok_web&cookie_enabled=true&current_region=IQ&data_collection_enabled=true&device_id=7656207899312031240&device_platform=web_pc&focus_state=true&from_page=user&history_len=1&is_fullscreen=false&is_page_visible=true&lang=en&nickname=aya slivany&object_id=7559288601604834325&odinId=7044133120342803457&os=windows&owner_id=7559288601604834325&priority_region=IQ&reason=90074&referer=&region=IQ&report_desc=&report_type=user&reporter_id=7044133120342803457&screen_height=956&screen_width=440&secUid=MS4wLjABAAAASqwOPDWKM_cL5hiq32HZ3nj5HxRZk4cO-eyVoo-QFJFCe9ZqyvXO_Nmw9FsrxTUZ&target=7559288601604834325&tz_name=Asia/Baghdad&user_is_login=true&verifyFp=verify_mqydtybf_nKqGVpcl_QGKr_47BG_8Keh_WF6tXWK7K3IN&webcast_language=en&msToken=g79Q41yJzLYUFBORB0No6bc8IQRWON2lB8yoD_PcbFBUs1l3ukR7iEz7lChMraWMK2nZCeX9BxUPoF-7WDpFSrS20s73rTZgrrowF3FnlteMKqTr6WmVNXfrCUp0dmw6EoODghHlxGiDJfai28WWFR8yQtAk&X-Bogus=DFSzKwVuTHbANjOaClXiJn8ARBgo&X-Gnarly=MKBUPR1UUxREf3/kiSW8rS-whaAssJkwNBzAhvxRIfv8c-PTUkd-8gGH3w6Gp-NEkidDzWckFWyHBqQ64YhDpscUiGz6Gov-QcsCuXz9FsyHd-dk-ylMA6YoxEMYRgQkYXpxZ4FBTCuQf4sPFAvcOG9AAHAXUJ-eO6/csqJtr6IZpezsuaag7tw06wVqe0WQb/ViWRHPL5SNuwKjuw8ppPKcOyqwUTMrW-eJuwTgwo6nNp7YfLCahvvppuR5ouTrFO9MM-KatEb4bC-x8DCO9wLe2ws6GIballHdUFw-X8dkhF8DyDFMmLOjUhsvPIYby1gPIFQYWptb';

        const response = await fetch(reportUrl, {
            method: 'GET',
            headers: {
                'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
                'Accept-Encoding: gzip, deflate, br, zstd',
                'sec-fetch-dest: empty',
                'sec-fetch-site: same-origin',
                'sec-fetch-mode: cors',
                'accept-language: en-US,en;q=0.9',
                'priority: u=3, i',
                'Cookie': cookies || '',
                'Referer': 'https://www.tiktok.com/'
                
            }
        });

        const text = await response.text();
        res.json({ success: response.ok, status: response.status, text });
    } catch(e) {
        res.json({ success: false, error: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
