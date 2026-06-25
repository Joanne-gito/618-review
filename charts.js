(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--ink').trim() || '#0F1A5C';
  var accent2 = style.getPropertyValue('--ink-dp').trim() || '#0B1340';
  var ink = style.getPropertyValue('--ink').trim() || '#0F1A5C';
  var muted = style.getPropertyValue('--ink-soft').trim() || 'rgba(15,26,92,0.72)';
  var rule = style.getPropertyValue('--rule').trim() || 'rgba(15,26,92,0.22)';
  var bg2 = style.getPropertyValue('--paper').trim() || '#F1E9D6';

  var dates = ["05-01","05-02","05-03","05-04","05-05","05-06","05-07","05-08","05-09","05-10","05-11","05-12","05-13","05-14","05-15","05-16","05-17","05-18","05-19","05-20","05-21","05-22","05-23","05-24","05-25","05-26","05-27","05-28","05-29","05-30","05-31","06-01","06-02","06-03","06-04","06-05","06-06","06-07","06-08","06-09","06-10","06-11","06-12","06-13","06-14","06-15","06-16","06-17","06-18","06-19"];
  var totalQty = [865,482,469,503,432,372,539,345,280,384,360,475,605,484,332,241,507,1062,746,678,648,613,443,406,508,587,524,711,687,519,1937,5110,3140,2408,2100,1586,1588,1737,1904,1862,1713,314,299,281,377,721,798,520,502,380];
  var totalAmt = [36038.38,23754.18,20375.11,22539.81,19832.84,17827.65,26809.03,17759.82,14165.68,18993.15,17363.78,26922.54,35582.39,30136.16,17923.38,12219.46,26274.71,53135.77,37896.99,35388.26,34068.5,31690.1,23495.52,22049.71,29324.04,35635.61,29146.94,46400.38,39525.28,30133.03,106244.93,283620.7,176074.06,137748.51,124796.09,89741.99,86369.82,95641.89,105178.58,107821.65,95038.67,15789.63,16657.35,14988.78,20033.54,35652.97,36393.16,26715.33,24976.78,20343.79];

  function commonOption() {
    return {
      animation: false,
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
        backgroundColor: 'rgba(241,233,214,0.95)',
        borderColor: 'rgba(15,26,92,0.25)',
        textStyle: { color: ink, fontFamily: 'Work Sans, sans-serif' }
      },
      grid: { left: '3%', right: '4%', bottom: '10%', top: '18%', containLabel: true },
      textStyle: { fontFamily: 'Work Sans, sans-serif', color: ink },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, interval: 4, fontFamily: 'Work Sans, sans-serif' }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } },
        axisLabel: { color: muted, fontFamily: 'Work Sans, sans-serif' }
      }
    };
  }

  // --- Chart 1: Daily Qty Trend (removed from HTML) ---
  var elQty = document.getElementById('chart-qty-trend');
  if (elQty) {
    var chartQty = echarts.init(elQty, null, { renderer: 'svg' });
    var qtyOption = commonOption();
    qtyOption.title = {
      text: '爆发期：05.31 – 06.10',
      left: 'center',
      top: 10,
      textStyle: { color: accent, fontSize: 13, fontWeight: 600, fontFamily: 'Work Sans, sans-serif' }
    };
    qtyOption.series = [{
      name: '总支付件数',
      type: 'line',
      data: totalQty,
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      lineStyle: { color: accent, width: 2.5 },
      itemStyle: { color: accent },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: accent + '33' }, { offset: 1, color: accent + '05' }]
        }
      },
      markArea: {
        silent: true,
        itemStyle: { color: accent + '12' },
        data: [[{ name: '爆发期', xAxis: '05-31' }, { xAxis: '06-10' }]]
      },
      markLine: {
        silent: true,
        symbol: ['none', 'arrow'],
        lineStyle: { color: accent2, type: 'solid', width: 1.5 },
        label: { position: 'insideEndTop', formatter: '峰值 {c} 件', color: accent2, fontWeight: 700, fontFamily: 'Work Sans, sans-serif', fontSize: 11 },
        data: [{ type: 'max', name: '峰值' }]
      },
      markPoint: {
        data: [{ type: 'max', name: '峰值', label: { show: false } }],
        symbol: 'pin',
        symbolSize: 44,
        itemStyle: { color: accent }
      }
    }];
    chartQty.setOption(qtyOption);
    window.addEventListener('resize', function() { chartQty.resize(); });
  }

  // --- Chart 2: Daily Amt Trend (removed from HTML) ---
  var elAmt = document.getElementById('chart-amt-trend');
  if (elAmt) {
    var chartAmt = echarts.init(elAmt, null, { renderer: 'svg' });
    var amtOption = commonOption();
    amtOption.title = {
      text: '爆发期：05.31 – 06.10',
      left: 'center',
      top: 10,
      textStyle: { color: accent, fontSize: 13, fontWeight: 600, fontFamily: 'Work Sans, sans-serif' }
    };
    amtOption.series = [{
      name: '总支付金额',
      type: 'line',
      data: totalAmt,
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      lineStyle: { color: accent2, width: 2.5 },
      itemStyle: { color: accent2 },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: accent2 + '33' }, { offset: 1, color: accent2 + '05' }]
        }
      },
      markArea: {
        silent: true,
        itemStyle: { color: accent + '12' },
        data: [[{ name: '爆发期', xAxis: '05-31' }, { xAxis: '06-10' }]]
      },
      markLine: {
        silent: true,
        symbol: ['none', 'arrow'],
        lineStyle: { color: accent, type: 'solid', width: 1.5 },
        label: { position: 'insideEndTop', formatter: '峰值 ${c}', color: accent, fontWeight: 700, fontFamily: 'Work Sans, sans-serif', fontSize: 11 },
        data: [{ type: 'max', name: '峰值' }]
      },
      markPoint: {
        data: [{ type: 'max', name: '峰值', label: { show: false } }],
        symbol: 'pin',
        symbolSize: 44,
        itemStyle: { color: accent2 }
      }
    }];
    chartAmt.setOption(amtOption);
    window.addEventListener('resize', function() { chartAmt.resize(); });
  }

    // Chart: 官方店 vs 专营店 支付金额双线
    var storeData = [];
    var storeDates = ["05-01","05-02","05-03","05-04","05-05","05-06","05-07","05-08","05-09","05-10","05-11","05-12","05-13","05-14","05-15","05-16","05-17","05-18","05-19","05-20","05-21","05-22","05-23","05-24","05-25","05-26","05-27","05-28","05-29","05-30","05-31","06-01","06-02","06-03","06-04","06-05","06-06","06-07","06-08","06-09","06-10","06-11","06-12","06-13","06-14","06-15","06-16","06-17","06-18","06-19"];
    var officialAmt = [32900.43,21410.78,18318.40,21127.70,17914.55,15526.70,23180.48,13120.24,11607.96,15401.41,14808.93,22582.52,30023.19,22061.92,13684.71,9855.04,20492.05,45172.65,31167.23,26974.89,26634.83,26588.61,19020.83,17307.12,24718.31,32497.40,26435.01,37671.17,37573.16,26627.92,98670.89,255621.95,151683.76,123638.01,93049.84,77503.72,69322.23,80881.86,83664.39,85582.95,75056.38,12218.94,13428.11,11880.86,15947.26,31225.15,32932.06,23813.23,22764.88,18258.97];
    var directAmt = [3137.95,2343.40,2056.71,1412.11,1918.29,2300.95,3628.55,4639.58,2557.72,3591.74,2554.85,4340.02,5559.20,8074.24,4238.67,2364.42,5782.66,7963.12,6729.76,8413.37,7433.67,5101.49,4474.69,4742.59,4605.73,3138.21,2711.93,8729.21,1952.12,3505.11,7574.04,27998.75,24390.30,14110.50,31746.25,12238.27,17047.59,14760.03,21514.19,22238.70,19982.29,3570.69,3229.24,3107.92,4086.28,4427.82,3461.10,2902.10,2211.90,2084.82];
    
    var chartStore = echarts.init(document.getElementById('chart-store-compare'), null, { renderer: 'svg' });
    chartStore.setOption({
      title: {
        text: '官方店峰值 $256K（06-01） · 专营店峰值 $31.7K（06-03） · 爆发期 5/31–6/10',
        left: 'center', top: 2,
        textStyle: { color: ink, fontSize: 12, fontWeight: 500, fontFamily: 'Work Sans, sans-serif' }
      },
      tooltip: { trigger: 'axis', formatter: function(params) {
        var d = params[0].axisValue;
        var html = '<b>' + d + '</b><br/>';
        params.forEach(function(p) {
          html += p.marker + ' ' + p.seriesName + ': $' + p.value.toLocaleString() + '<br/>';
        });
        return html;
      }},
      legend: { data: ['官方店', '专营店'], bottom: 0, textStyle: { color: ink, fontFamily: 'Work Sans, sans-serif' }},
      grid: { left: 60, right: 20, top: 45, bottom: 40 },
      xAxis: { type: 'category', data: storeDates, axisLabel: { fontSize: 10, color: muted, interval: 4, fontFamily: 'Work Sans, sans-serif' }},
      yAxis: { type: 'value', axisLabel: { fontSize: 10, color: muted, formatter: function(v) { return '$' + (v/1000) + 'K'; }, fontFamily: 'Work Sans, sans-serif' }, splitLine: { lineStyle: { color: rule, type: 'dashed' }}},
      series: [
        {
          name: '官方店', type: 'line', data: officialAmt, smooth: true,
          lineStyle: { width: 2.5, color: accent },
          areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: accent + '30' }, { offset: 1, color: accent + '05' }]}},
          itemStyle: { color: accent },
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
})();
