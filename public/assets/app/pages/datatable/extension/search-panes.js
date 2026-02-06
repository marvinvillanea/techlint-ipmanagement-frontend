"use strict";
$(function() {
    $("#datatable-1").DataTable({
        responsive: true,
        dom: 'Pfrtip',
        searchPanes: {
            layout: 'columns-2', // You can customize the layout as needed
            columns: [3],
            cascadePanes: true,
            viewTotal: true// Specify the column(s) where you want to enable search panes
        },
       
        // searchPanes: {
        //     cascadePanes: true,
        //     viewTotal: true
        // },
        language: {
            searchPanes: {
                count: "{total} found",
                countFiltered: "{shown} / {total}"
            }
        }
    })
});