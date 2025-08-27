
$(function(){
  const url = "./xinzhuang_taishan_2022_2026_monthly.json";
  let dataset = null;

  function renderTable(district, yearFilter){
    if(!dataset) return;
    const dr = dataset.districts[district];
    $('#cagr').text(dr.average_cagr);
    let rows = dr.data.filter(r => {
      if(yearFilter === 'all') return true;
      return String(r.year) === String(yearFilter);
    }).map((r,i) => {
      const note = r.estimated ? '<span class="badge bg-warning text-dark badge-est">估算</span>' : '<span class="badge bg-success badge-est">實際</span>';
      return `
        <tr>
          <td>${i+1}</td>
          <td>${r.year}</td>
          <td>${String(r.month).padStart(2,'0')}</td>
          <td>${r.date}</td>
          <td>${r.price} 萬/坪</td>
          <td>${r.mom_return}</td>
          <td>${note}</td>
        </tr>
      `;
    }).join('');
    $('#tableBody').html(rows);
  }

  $.getJSON(url, function(res){
    dataset = res;
    $('#linkJson').attr('href', url);
    $('#linkHtml').attr('href', './index.html');
    $('#linkJs').attr('href', './app.js');
    renderTable('新莊區','all');
  }).fail(function(){ console.error('載入 JSON 失敗'); });

  $('#districtSelect, #yearFilter').on('change', function(){
    const d = $('#districtSelect').val();
    const y = $('#yearFilter').val();
    renderTable(d,y);
  });
});
