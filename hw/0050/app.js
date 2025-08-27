$(document).ready(function(){
const tbody = $('#myTbody');
const cagrEl = $('#cagr');
const avgEl = $('#avgReturn');


$.getJSON('./tw0050_last_trading_day_30y.json', function(res){
const data = res.data;
// 計算 CAGR（使用第一個實際年與最後一個實際年，若最後幾筆為 projection 也可辨識）
// 我們在 JSON 中已將 projection 放在最後面，且標記為 "is_projection": true


// 找到第一個非 projection 與最後一個非 projection
const actuals = data.filter(d => !d.is_projection);
const first = actuals[0];
const last = actuals[actuals.length-1];
const periods = last.year - first.year; // ex: 2024-2003 = 21
const cagr = Math.pow(last.close/first.close, 1/periods) - 1;


// 計算算術平均年報酬（由每年 return_close）
const returns = actuals.map(d => parseFloat(d.return_close.replace('%',''))/100);
const avgReturn = (returns.reduce((a,b)=>a+b,0)/returns.length);


// render
let html = '';
data.forEach((row, idx) => {
const isProj = !!row.is_projection;
html += `<tr class="${isProj? 'proj':''}">`;
html += `<td>${idx+1}</td>`;
html += `<td>${row.year}</td>`;
html += `<td>${row.close.toFixed(2)}</td>`;
html += `<td>${row.return_close}</td>`;
html += `</tr>`;
});
tbody.html(html);


cagrEl.text((cagr*100).toFixed(2) + '%');
avgEl.text((avgReturn*100).toFixed(2) + '%');
}).fail(function(e){
tbody.html('<tr><td colspan="4">無法載入 JSON 檔，請確認檔案存在於相同目錄並可被網頁讀取。</td></tr>');
});
});