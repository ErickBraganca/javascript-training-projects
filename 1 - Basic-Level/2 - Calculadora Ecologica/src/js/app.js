var btn_action = (document.getElementById("btn_calculator"));
    btn_action.addEventListener("click", addData);
        function addData() {
            
            if ((document.getElementById("power_value")).value == "")
                alert("Digite um valor para iniciar")
            else
                var txt_power = (document.getElementById("power_value")).value;
                var power_month = (txt_power).toLocaleString("pt-br")
                var power_year = txt_power * 12
                var carbon_removed = (power_year * 0.1258).toFixed(0)
                var tree_number = (power_year * 0.000504).toFixed(0)
                document.getElementById("mans_value").innerText = power_month + " kWh/Mês"
                document.getElementById("year_value").innerText = power_year + " kWh/Ano"
                document.getElementById("carbon_value").innerText = carbon_removed + " kG/Ano"
                document.getElementById("tree_value").innerText = tree_number + " Arvores/Ano"
                document.getElementById("power_value").value = ""
        }





