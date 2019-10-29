function main() {
  $(document).ready(function() {

   function classSoldier (data) {
      let valClass = data[0].class == '1' ? 'Штурмовики':
      data[0].class == '2' ? 'Медики':
      data[0].class == '3' ? 'Снайперы':
      data[0].class == '4' ? 'Инженеры':
      ''
      return valClass
   }

    function startAjax() {
        
            $('.load, svg').show()
            $('.gamers').html('')

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
                     $('.gamers').html('')
                     $('.load, svg').hide()
           
                     $('.gamers').html(`<h2 class='center'>Лучшие ${classSoldier(response)}</h2>`);

                     
                     response.forEach(i => {
                        let clan = i.clan == '-' ? 'Не состоит в клане' : i.clan
                        $('.gamers').append(`<div class='gamer_bord'><h4>${i.nickname}</h4><h5>${clan}</div>`);
                    })
                    response[0].class = 0
                    

                },
                error: (err) => {
                  console.log(err)
                  $('.load, svg').hide()
                  
                    
                  $('.gamers').html(`<div class='err'><h2 class='center'>Что-то пошло не так</h2> <br>
                    <a class="waves-effect waves-light btn-large top100">Обновить</a></div>`);
                  $('.top100').on('click', () => {
                    $('.gamers').html(``);
                     main()
                  }) 
                    

                }
            })

    }
    startAjax()


   $('.top100 input:radio').change(function() {
      startAjax()
   })

});
}

main()