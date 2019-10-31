$(document).ready(function() {


    function classSoldier(clas) {
        let valClass = clas == 1 ? 'Штурмовики' :
            clas == 2 ? 'Медики' :
            clas == 3 ? 'Снайперы' :
            clas == 4 ? 'Инженеры' :
            ''
        return valClass
    }

    function startAjax() {
        $('.gamers').html('')
        $('.load, svg').show()


        let server = $('input[name="group2"]:checked').val()
        let clas = $('input[name="group3"]:checked').val()

        $.ajax({
            type: 'POST',
            data: {
                server,
                clas
            },
            dataType: 'json',
            url: '/top100',

            success: (response) => {

                $('.load, svg').hide()

                $('.gamers').html(`<h2 class='center'>Лучшие ${classSoldier(clas)}</h2>`);


                response.forEach(i => {
                    let clan = i.clan == '-' ? 'Не состоит в клане' : i.clan
                    $('.gamers').append(`<div class='gamer_bord'><h4>${i.nickname}</h4><h5>${clan}</h5></div>`);
                })

                return


            },
            error: (err) => {
                console.log(err)
                $('.load, svg').hide()


                $('.gamers').html(`<div class='err'><h2 class='center'>Что-то пошло не так</h2>`);

                return


            }
        })
    }

    startAjax()


    $('.top100 input:radio').change(function() {
        startAjax()
    })
});