let expenses = [];

$(document).ready(function(){
    $('#expenseform').submit(function(event){

        event.preventDefault();
        const name = $('#name').val();
        const amount = parseFloat($('#expense').val());



        expenses.push({name,amount});

        $('#expenselist').append(`<li>${name} spent ₹${amount}</li>`);
    
        $('#name').val('');
        $('#expense').val('');

        $.ajax({
            url: '/save',                   // Where to send the data (Express POST route)
            method: 'POST',                 // Type of request
            contentType: 'application/json',  // Tells server we're sending JSON
            data: JSON.stringify({ name, amount }),  // Convert JS object to JSON string
            success: () => console.log('Expense saved to backend'),
            error: () => console.error('Error saving expense')
});


    
    });

    $('#totalbtn').click(function(){

        let total = 0;

        expenses.forEach(exp => {
            total += parseFloat(exp.amount);
        });

        const totalpeople = expenses.length;
        const split = totalpeople > 0 ? (total/totalpeople) : 0;

        $('#total').text(`Total expense of all people: ₹${total.toFixed(2)}`).show();
        $('#split').text(`Split per Person: ₹${split.toFixed(2)}`).show();

        $('#sharelist').empty();

        expenses.forEach(exp => {

            const name = exp.name;
            const amountpaid = parseFloat(exp.amount);
            const balance = (amountpaid-split).toFixed(2);


            let mss = ' ';

            if(balance>0){
                mss = `${name} should receive ₹${balance}`;
            }
            else if(balance<0){
                mss = `${name} should pay ₹${Math.abs(balance)} extra`;
            }
            else if(balance===0){
                mss = `${name} is settled up`;
            }

            $('#sharelist').append(`<li>${mss}</li>`);

        });

    });
});