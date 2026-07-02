(function() {
  var style = getComputedStyle(document.documentElement);
  var clrAccent = style.getPropertyValue('--accent').trim() || '#3CD896';
  var clrInk = style.getPropertyValue('--ink').trim() || '#0F1A5C';
  var clrMuted = style.getPropertyValue('--ink-soft').trim() || 'rgba(15,26,92,0.72)';
  var clrRule = style.getPropertyValue('--rule').trim() || 'rgba(15,26,92,0.22)';

  function commonOption() {
    return {
      animation: false,
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
        backgroundColor: 'rgba(241,233,214,0.95)',
        borderColor: 'rgba(15,26,92,0.25)',
        textStyle: { color: clrInk, fontFamily: 'Work Sans, sans-serif' }
      },
      grid: { left: '3%', right: '4%', bottom: '10%', top: '18%', containLabel: true },
      textStyle: { fontFamily: 'Work Sans, sans-serif', color: clrInk },
      xAxis: {
        type: 'category',
        axisLine: { lineStyle: { color: clrRule } },
        axisLabel: { color: clrMuted, interval: 4, fontFamily: 'Work Sans, sans-serif' }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: clrRule, type: 'dashed' } },
        axisLabel: { color: clrMuted, fontFamily: 'Work Sans, sans-serif' }
      }
    };
  }

  var storeDates = ["05-01","05-02","05-03","05-04","05-05","05-06","05-07","05-08","05-09","05-10","05-11","05-12","05-13","05-14","05-15","05-16","05-17","05-18","05-19","05-20","05-21","05-22","05-23","05-24","05-25","05-26","05-27","05-28","05-29","05-30","05-31","06-01","06-02","06-03","06-04","06-05","06-06","06-07","06-08","06-09","06-10","06-11","06-12","06-13","06-14","06-15","06-16","06-17","06-18","06-19"];
  var officialAmt = [32900.43,21410.78,18318.40,21127.70,17914.55,15526.70,23180.48,13120.24,11607.96,15401.41,14808.93,22582.52,30023.19,22061.92,13684.71,9855.04,20492.05,45172.65,31167.23,26974.89,26634.83,26588.61,19020.83,17307.12,24718.31,32497.40,26435.01,37671.17,37573.16,26627.92,98670.89,255621.95,151683.76,123638.01,93049.84,77503.72,69322.23,80881.86,83664.39,85582.95,75056.38,12218.94,13428.11,11880.86,15947.26,31225.15,32932.06,23813.23,22764.88,18258.97];
  var directAmt = [3137.95,2343.40,2056.71,1412.11,1918.29,2300.95,3628.55,4639.58,2557.72,3591.74,2554.85,4340.02,5559.20,8074.24,4238.67,2364.42,5782.66,7963.12,6729.76,8413.37,7433.67,5101.49,4474.69,4742.59,4605.73,3138.21,2711.93,8729.21,1952.12,3505.11,7574.04,27998.75,24390.30,14110.50,31746.25,12238.27,17047.59,14760.03,21514.19,22238.70,19982.29,3570.69,3229.24,3107.92,4086.28,4427.82,3461.10,2902.10,2211.90,2084.82];

  var el = document.getElementById('chart-store-compare');
  if (!el) return;

  var chart = echarts.init(el, null, { renderer: 'svg' });
  chart.setOption({
    title: {
      text: '官方店峰值 $256K（06-01） · 专营店峰值 $31.7K（06-03） · 爆发期 5/31–6/10',
      left: 'center', top: 2,
      textStyle: { color: clrInk, fontSize: 12, fontWeight: 500, fontFamily: 'Work Sans, sans-serif' }
    },
    tooltip: { trigger: 'axis', formatter: function(params) {
      var d = params[0].axisValue;
      var html = '<b>' + d + '</b><br/>';
      params.forEach(function(p) {
        html += p.marker + ' ' + p.seriesName + ': $' + p.value.toLocaleString() + '<br/>';
      });
      return html;
    }},
    legend: { data: ['官方店', '专营店'], bottom: 0, textStyle: { color: clrInk, fontFamily: 'Work Sans, sans-serif' }},
    grid: { left: 60, right: 20, top: 45, bottom: 40 },
    xAxis: { type: 'category', data: storeDates, axisLabel: { fontSize: 10, color: clrMuted, interval: 4, fontFamily: 'Work Sans, sans-serif' }},
    yAxis: { type: 'value', axisLabel: { fontSize: 10, color: clrMuted, formatter: function(v) { return '$' + (v/1000) + 'K'; }, fontFamily: 'Work Sans, sans-serif' }, splitLine: { lineStyle: { color: clrRule, type: 'dashed' }}},
    series: [
      {
        name: '官方店', type: 'line', data: officialAmt, smooth: true,
        lineStyle: { width: 2.5, color: clrAccent },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#3CD89630' }, { offset: 1, color: '#3CD89605' }]}},
        itemStyle: { color: clrAccent },
        markArea: {
          silent: true,
          itemStyle: { color: 'rgba(232,168,124,0.12)' },
          label: { show: false },
          data: [[
            { xAxis: '05-31' },
            { xAxis: '06-10' }
          ]]
        }
      },
      {
        name: '专营店', type: 'line', data: directAmt, smooth: true,
        lineStyle: { width: 2, color: '#E8A87C', type: 'dashed' },
        itemStyle: { color: '#E8A87C' }
      }
    ]
  });
  window.addEventListener('resize', function() { chart.resize(); });

  // Visitor trend chart
  (function() {
    var visitorEl = document.getElementById('chart-visitor-trend');
    if (!visitorEl) return;
    var vChart = echarts.init(visitorEl, null, { renderer: 'svg' });

    var weeks = ['04/27-05/03','05/04-05/10','05/11-05/17','05/18-05/24','05/25-05/31','06/01-06/07','06/08-06/14','06/15-06/21','06/22-06/28'];
    var globalVisitors = [60836, 66352, 109315, 103981, 104440, 222471, 135747, 113835, 84411];
    var offsiteApp = [3161, 3164, 4402, 4516, 4803, 17314, 8662, 5142, 3656];

    vChart.setOption({
      title: {
        text: '巴士巡游 6/1 · 时钟广告 6/8 · 地铁广告 6/15 · 618 大促 5/31-6/10',
        left: 'center', top: 2,
        textStyle: { color: clrInk, fontSize: 12, fontWeight: 500, fontFamily: 'Work Sans, sans-serif' }
      },
      tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          var html = '<b>' + params[0].axisValue + '</b><br/>';
          params.forEach(function(p) {
            html += p.marker + ' ' + p.seriesName + ': ' + p.value.toLocaleString() + '<br/>';
          });
          return html;
        }
      },
      legend: { data: ['全店 Global', '站外流量 APP'], bottom: 0, textStyle: { color: clrInk, fontFamily: 'Work Sans, sans-serif' }},
      grid: { left: 60, right: 60, top: 45, bottom: 40 },
      xAxis: {
        type: 'category',
        data: weeks,
        axisLabel: { fontSize: 10, color: clrMuted, fontFamily: 'Work Sans, sans-serif' }
      },
      yAxis: [
        {
          type: 'value',
          name: '全店',
          nameTextStyle: { color: clrMuted, fontSize: 10 },
          axisLabel: { fontSize: 10, color: clrMuted, formatter: function(v) { return (v/1000).toFixed(0) + 'K'; }, fontFamily: 'Work Sans, sans-serif' },
          splitLine: { lineStyle: { color: clrRule, type: 'dashed' }}
        },
        {
          type: 'value',
          name: '站外APP',
          nameTextStyle: { color: clrMuted, fontSize: 10 },
          axisLabel: { fontSize: 10, color: clrMuted, formatter: function(v) { return (v/1000).toFixed(1) + 'K'; }, fontFamily: 'Work Sans, sans-serif' },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '全店 Global', type: 'bar', data: globalVisitors,
          barWidth: '40%',
          itemStyle: { color: clrAccent, borderRadius: [4, 4, 0, 0] },
          markArea: {
            silent: true,
            itemStyle: { color: 'rgba(232,168,124,0.12)' },
            data: [[
              { xAxis: '06/01-06/07' },
              { xAxis: '06/08-06/14' }
            ]]
          }
        },
        {
          name: '站外流量 APP', type: 'line', data: offsiteApp, smooth: true,
          yAxisIndex: 1,
          lineStyle: { width: 2.5, color: '#E8A87C' },
          itemStyle: { color: '#E8A87C' },
          areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#E8A87C30' }, { offset: 1, color: '#E8A87C05' }]}},
          markLine: {
            silent: true,
            symbol: 'none',
            lineStyle: { color: 'rgba(15,26,92,0.35)', type: 'dashed', width: 1 },
            label: { position: 'insideEndTop', fontSize: 9, color: clrMuted, fontFamily: 'Work Sans, sans-serif' },
            data: [
              { xAxis: '06/01-06/07', label: { formatter: '巴士 6/1' } },
              { xAxis: '06/08-06/14', label: { formatter: '时钟 6/8' } },
              { xAxis: '06/15-06/21', label: { formatter: '地铁 6/15' } }
            ]
          }
        }
      ]
    });
    window.addEventListener('resize', function() { vChart.resize(); });
  })();
})();
