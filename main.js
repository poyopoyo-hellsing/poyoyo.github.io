$(function() {
    $('.hp').on('input', function() {
        console.log('check1');
        var ware_hp_start = $('#hp1').val();
        var ware_hp_end = $('#hp2').val();
        var teki_hp_start = $('#hp3').val();
        var teki_hp_end = $('#hp4').val();
        if(ware_hp_end > 0 && ware_hp_start > 0 && teki_hp_end > 0 && teki_hp_start > 0) {
            var rate = ((teki_hp_start - teki_hp_end) / teki_hp_start) / ((ware_hp_start - ware_hp_end) / ware_hp_start);
            console.log(rate);
            $('#result').text(rate);
        }
    });
});