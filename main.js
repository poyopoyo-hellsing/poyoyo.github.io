$(function() {
    var input = null;
    //分母に応じて分子の最大値&value設定
    $('.parent-hp').on('input', function() {
        var val = $(this).val();
        var prev = $(this).prev();
        prev.attr('max', val);
        //最大値を超えてたら修正
        var childVal = prev.val();
        if(val < childVal) {
            prev.val(val);
        }
        if(prev.prev().prop('tagName') === 'INPUT') {
            prev = prev.prev();
            //最大値を超えてたら修正
            childVal = prev.val();
            if(val < childVal) {
                prev.val(val);
            }
        }
    });
    
    //敵プリセット適用
    $('#hp3').on('change', function() {
        var elem = $(this).val();
        var hps = elem.split('_');
        for(let i = 0; i < 6; i++) {
            $('.teki-start-hp').eq(i).val(hps[i]);
            let e = new Event('input');
            document.getElementsByClassName('teki-start-hp')[i].dispatchEvent(e);
        }
    });
    
    $('input').on('input', function() {
        var ws_total = sumHp('.ware-start-hp');
        var we_total = sumHp('.ware-end-hp');
        var ts_total = sumHp('.teki-start-hp');
        var te_total = sumHp('.teki-end-hp');
        $('#ware-total-hp-start').text(ws_total);
        $('#ware-total-hp-end').text(we_total);
        $('#teki-total-hp-start').text(ts_total);
        $('#teki-total-hp-end').text(te_total);
        let e = new Event('input');
        document.getElementsByClassName('total-hp')[0].dispatchEvent(e);
    });
    
    function sumHp(selector) {
        var res = 0;
        for(let i = 0; i < 6; i++) {
            res += Number($(selector).eq(i).val());
        }
        return res;
    }
    
    //ホイール関連
    $('input').on("mouseover", function (event) {
        // マウスオーバー時にマウスホイールのイベントを監視
        input = $(this);
        $(this).on("wheel", handleMouseWheel);
    });
    $('input').on("mouseout", function () {
        // マウスオーバーが外れたらマウスホイールの監視を解除
        $(this).off("wheel", handleMouseWheel);
    });
    function handleMouseWheel(event) {
        // マウスホイールイベントから値を増減させる
        event.preventDefault();
        const currentValue = parseFloat(this.value) || 0;
        var step = event.originalEvent.deltaY / 100;
        const newValue = currentValue + (event.deltaY > 0 ? step : -step); // スクロール方向に応じて加算または減算

        // 最小値と最大値の制約を適用
        const min = parseFloat(this.min);
        const max = parseFloat(this.max) || null;
        if ((min === null || newValue >= min) && (max === null || newValue <= max)) {
            this.value = newValue;
            let e = new Event('input');
            input[0].dispatchEvent(e);
        }
    }
    //ホイール関連終
    
    //ゲージ比計算
    $('.total-hp').on('input', function() {
        var ware_hp_start = Number($('#ware-total-hp-start').text());
        var ware_hp_end = Number($('#ware-total-hp-end').text());
        var teki_hp_start = Number($('#teki-total-hp-start').text());
        var teki_hp_end = Number($('#teki-total-hp-end').text());
        if(ware_hp_end > 0 && ware_hp_start > 0 && teki_hp_end > 0 && teki_hp_start > 0) {
            var rate = ((teki_hp_start - teki_hp_end) / teki_hp_start) / ((ware_hp_start - ware_hp_end) / ware_hp_start);
            $('#result').text(rate);
        }
    });
    //データ保存
    $('.ware-max-hp').on('input', function() {
        var num = [];
        for(let i = 0; i < 6; i++) {
            num.push($('.ware-max-hp').eq(i).val());
        }
        console.log(num);
        JSON.stringify(num);
        console.log(num);
        localStorage.setItem('preset', num);
    });
    //読み込み時に展開
    var preset = localStorage.getItem('preset');
    console.log(preset);
    if(preset) {
        var arr = preset.split(',');
        for(let i = 0; i < 6; i++) {
            $('.ware-max-hp').eq(i).val(arr[i]);
            let e = new Event('input');
            document.getElementsByClassName('ware-max-hp')[i].dispatchEvent(e);
        }
    }
});