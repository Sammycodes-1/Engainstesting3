const validated_ticket = (
  event,
  title = "Destek",
  validate_fields = {
      message: 1,
      additional_info: 0,
  },
  messages = {
      success: 'Gönderildi',
      validate: 'Zorunlu alanları doldurmalısınız.'
  }
) => {
  event.preventDefault();
  console.log(title, validate_fields);
  var subject = title;
  var validate_error = false;
  var message = "";
  const ticket_form = $(event.currentTarget).parents(`[x-selector~="ticket-form"]`)
  const fields = _.keys(validate_fields);

  _.each(fields, f => {
      const f_error = ticket_form.find(`[x-selector="${f}-error"]`);
      if (f_error) f_error.addClass('hidden').removeClass('text-red-500');
      if (validate_fields[f] && ticket_form.find(`[x-selector="${f}"]`).val() === '') {
          validate_error = true;
          if (f_error && f_error.hasClass('hidden')) f_error.removeClass('hidden').addClass('text-red-500');
      }
      message += `\n${f.replace('_', ' ')}\n${ticket_form.find(`[x-selector="${f}"]`).val()}\n`;
  })

  if (!validate_error) {
      var formData = new FormData(document.getElementById(ticket_form.attr('id')));
      formData.append('TicketForm[subject]', subject);
      formData.append('TicketForm[message]', message);

      fetch("/ticket-create", {
          method: "POST",
          body: formData,
      }).then(res => res.json()).then(response => {
          if (response.error) console.log(response.error);
          if (response.status === 'error') {
              ticket_form.find(`[x-selector="ticket-form-alert"]`).removeClass('bg-green-600').addClass('bg-red-600').html(response.error).show()
              ticket_form.find(`button`).removeAttr('disabled').removeClass('disabled');
          } else {
              ticket_form.trigger("reset");
              ticket_form.find(`[x-selector="ticket-form-alert"]`).removeClass('bg-red-600').addClass('bg-green-600').html(messages.success).show()
          }

      });
  } else {
      ticket_form.find(`[x-selector="ticket-form-alert"]`).removeClass('bg-red-600').removeClass('bg-red-600').addClass('bg-red-600').html(messages.validate).show()
  }

  return false;
}



const service_description = (service_id) => {
    const service = window.modules.siteOrder.services[service_id];
  
    if (service.description !== null && service.description.length > 0) {
      $(`[x-selector="service-description-extra"] > *`).removeClass('hidden').addClass('hidden')
      _.each(service.description.split('<br>'), row => {
        if (row.indexOf('[') === 0) {
          const row_data = row.replace('[', '').replace(']', '').split(',');
          const tag = row_data[0];
          const exists = row_data[1];
          if ((exists || 'yok').toLowerCase() !== 'yok') {
            $(`[x-selector="service-description-extra"] [x-selector="service-tag-${tag}"]`).removeClass('hidden')
            $(`[x-selector="service-description-extra"] [x-selector="service-tag-${tag}"] [x-selector="text"]`).text(exists);
          } else {
            $(`[x-selector="service-description-extra"] [x-selector="service-tag-${tag}"]`).addClass('hidden')
          }
        }
      })
  
      const __description = ((service.description || '') + '<br>');
      const filtered_description = _.chain(__description.split('<br>')).filter(d => {
        return (d.indexOf('[') === -1) ? true : false;
      }).value().join('<br>');
  
      $(`[x-selector="service-description-text"]`).html(filtered_description)
    }
  }
    
  
  
  const send_ticket = (event, title = "Destek Bildirimi", fields = ["message"], success_message = 'Gönderildi.') => {
    // button
    // onclick="send_ticket(event,'Papara Ödeme Bildirimi', ['papara_id','papara_username','mesaj'],'Papara işleminiz incelendikten sonra hesabınıza tanımlanacaktır.')"
    event.preventDefault();
    console.log(title, fields);
    var subject = title;
    var message = "";
    const ticket_form = $(event.currentTarget).parents(`[x-selector~="ticket-form"]`)
    _.each(fields, f => {
      message += `\n${f.replace('_',' ')}\n${ticket_form.find(`[x-selector="${f}"]`).val()}\n`;
    })
  
    var formData = new FormData(document.getElementById(ticket_form.attr('id')));
    formData.append('TicketForm[subject]', subject);
    formData.append('TicketForm[message]', message);
  
    fetch("/ticket-create", {
      method: "POST",
      body: formData,
    }).then(res => res.json()).then(response => {
      if (response.error) console.log(response.error);
      if (response.status === 'error') {
        $(ticket_form).find(`[x-selector="ticket-form-alert"]`).removeClass('bg-green-600').addClass('bg-red-600').html(response.error).show()
        $(ticket_form).find(`button`).removeAttr('disabled').removeClass('disabled');
      } else {
        $(ticket_form).trigger("reset");
        $(ticket_form).find(`[x-selector="ticket-form-alert"]`).removeClass('bg-red-600').addClass('bg-green-600').html(success_message).show()
      }
  
    });
  
    return false;
  
  }
  
  const $params = (sParam) => {
    var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), sParameterName, i;
  
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
    return false;
  };
  
  const on_message_results_received = (data, success) => {
    $(`[x-selector="tg-messages"]`).children().remove();
    if (data && data.docs && data.page) list_messages(data.docs)
  }
  
  const search_messages = () => $.get(`${__.endpoint}/tgmessages/0`, on_message_results_received);
  
  const list_messages = (messages_data) => {
    const tgmsgs = $(`[x-selector="tg-messages"]`);
    const sorted = _.sortBy(messages_data, x => 0 - x.timestamp);
    _.each(sorted, msg_item => {
      const tgmsg = $(`[x-selector="tg-message"]`).clone();
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      tgmsg.find(`[x-selector="tg-date"]`).text((new Date(msg_item.timestamp)).toLocaleDateString('tr-TR',))
      tgmsg.find(`[x-selector="tg-text"]`).text(msg_item.text)
      tgmsg.show();
      tgmsg.removeAttr('x-selector');
      $(tgmsg).appendTo(tgmsgs);
    })
  }
  
 
  
  
  
  
 
  
  function selectOrder(a) {
    $(`#orders-drop [x-selector~="details-close"]`).parents('[x-selector~="details-root"]').attr('open', null)
    $("#orderform-service").val(a), $("#orderform-service").trigger("change");
    var s = ikon($("#orderform-service option[value='" + a + "']").text());
    $("#serviceTitle").html(s + $("#orderform-service option[value='" + a + "']").text())
  }
  
  function selectCategory(a) {
    $(`#category-drop [x-selector~="details-close"]`).parents('[x-selector~="details-root"]').attr('open', null)
    $("#orderform-category").val(a), $("#orderform-category").trigger("change");
    var s = ikon($("#orderform-category option[value='" + a + "']").text());
    $("#categoryTitle").html(s + $("#orderform-category option[value='" + a + "']").text())
  } ;
  
  
 
  