exports.controllers = [
  {
    id: 1,
    name: 'Soldados',
    color: '#663300',
    __positions__: [2]
  },
  {
    id: 2,
    name: 'Praças',
    color: '#2196f3',
    __positions__: [3, 4, 5, 6]
  },
  {
    id: 3,
    name: 'Oficiais',
    color: '#000099',
    __positions__: [7, 8, 9, 10, 11, 12, 13, 38]
  },
  {
    id: 4,
    name: 'Executivos',
    color: '#6600ff',
    __positions__: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
  },
  {
    id: 5,
    name: 'Tags',
    color: '#000000',
    allow_any_position: true
  },
  {
    id: 6,
    name: 'Gratificados',
    color: '#660000',
    allow_any_position: true
  },
  {
    id: 7,
    name: 'Desligados',
    color: '#000000',
    allow_any_position: true
  },
  {
    id: 8,
    name: 'Reformados',
    color: '#ff9933',
    allow_any_position: true
  },
  {
    id: 9,
    name: 'Exonerados',
    color: '#ff0000',
    allow_any_position: true
  }
]

exports.actions = [
  {
    alias: 'SAVE_REQUEST',
    execute_on: 'CREATE',
    name: 'Salvar uma Requisição',
    description:
      'Salva uma requisição na tabela "requests" com os dados do formulário.'
  }
]

exports.types = [
  // --- INSTRUÇÕES INICIAIS
  {
    id: 1,
    controller_id: 1,
    name: 'Aprovação em CFSd',
    timeline_title: 'Aprovado(a) em CFSd',
    description: '(Instruções Iniciais)',
    color: '#4e3727',
    icon: 'fa fa-check',
    allow_unregistered_users: true,
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  // --- PRAÇAS
  {
    id: 2,
    controller_id: 2,
    name: 'Promoção',
    timeline_title: 'Promovido(a)',
    description: '(Praças)',
    color: '#4caf50',
    icon: 'fa fa-arrow-circle-up',
    before_position_group_id: 1,
    after_position_group_id: 1,
    strict_to_position_group: 1,
    field_before_position: 'REQUIRED',
    field_after_position: 'REQUIRED',
    field_reason: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  {
    id: 3,
    controller_id: 2,
    name: 'Rebaixamento',
    timeline_title: 'Rebaixado(a)',
    description: '(Praças)',
    color: '#d32f2f',
    icon: 'fa fa-arrow-circle-down',
    before_position_group_id: 1,
    after_position_group_id: 1,
    strict_to_position_group: 1,
    field_before_position: 'REQUIRED',
    field_after_position: 'REQUIRED',
    field_reason: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  {
    id: 4,
    controller_id: 2,
    name: 'Reintegração',
    timeline_title: 'Reintegrado(a)',
    description: '(Praças)',
    color: '#3949ab',
    icon: 'fa fa-arrow-circle-o-right',
    allow_unregistered_users: true,
    after_position_group_id: 1,
    field_after_position: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  // --- OFICIAIS
  {
    id: 5,
    controller_id: 3,
    name: 'Promoção',
    timeline_title: 'Promovido(a)',
    description: '(Oficiais)',
    color: '#4caf50',
    icon: 'fa fa-arrow-circle-up',
    before_position_group_id: 1,
    after_position_group_id: 1,
    strict_to_position_group: 1,
    field_before_position: 'REQUIRED',
    field_after_position: 'REQUIRED',
    field_reason: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  {
    id: 6,
    controller_id: 3,
    name: 'Rebaixamento',
    timeline_title: 'Rebaixado(a)',
    description: '(Oficiais)',
    color: '#d32f2f',
    icon: 'fa fa-arrow-circle-down',
    before_position_group_id: 1,
    after_position_group_id: 1,
    strict_to_position_group: 1,
    field_before_position: 'REQUIRED',
    field_after_position: 'REQUIRED',
    field_reason: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  {
    id: 7,
    controller_id: 3,
    name: 'Licença',
    timeline_title: 'Solicitou Licença',
    description: '(Oficiais)',
    color: '#3949ab',
    icon: 'fa fa-clock-o',
    strict_to_position_group: 1,
    field_reason: 'REQUIRED',
    field_notes: 'OPT',
    field_asked_by: 'OPT',
    field_absence_days: 'OPT'
  },
  {
    id: 8,
    controller_id: 3,
    name: 'Reserva',
    timeline_title: 'Solicitou Reserva',
    description: '(Oficiais)',
    color: '#8e24aa',
    icon: 'fa fa-calendar-o',
    strict_to_position_group: 1,
    field_reason: 'REQUIRED',
    field_notes: 'OPT',
    field_asked_by: 'OPT',
    field_absence_days: 'OPT'
  },
  {
    id: 9,
    controller_id: 3,
    name: 'Advertência',
    timeline_title: 'Advertido(a)',
    description: '(Oficiais)',
    color: '#fb8c00',
    icon: 'fa fa-exclamation-triangle',
    strict_to_position_group: 1,
    field_reason: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  // --- EXECUTIVOS
  {
    id: 10,
    controller_id: 4,
    name: 'Promoção',
    timeline_title: 'Promovido(a)',
    description: '(Executivos)',
    color: '#4caf50',
    icon: 'fa fa-arrow-circle-up',
    before_position_group_id: 2,
    after_position_group_id: 2,
    strict_to_position_group: 2,
    field_before_position: 'REQUIRED',
    field_after_position: 'REQUIRED',
    field_reason: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  {
    id: 11,
    controller_id: 4,
    name: 'Compra de Cargo',
    timeline_title: 'Comprou cargo',
    description: '(Executivos)',
    color: '#388e3c',
    icon: 'fa fa-dollar',
    info_text:
      'Se o usuário não for da Polícia RCC, marque "Recruta" em "patente atual". <strong>Informe</strong> notas adicionais sobre a venda em "notas".',
    allow_multiple_users: false,
    allow_unregistered_users: true,
    after_position_group_id: 2,
    field_before_position: 'REQUIRED',
    field_after_position: 'REQUIRED',
    field_notes: 'OPT',
    field_asked_by: 'OPT',
    field_price: 'REQUIRED'
  },
  {
    id: 12,
    controller_id: 4,
    name: 'Rebaixamento',
    timeline_title: 'Rebaixado(a)',
    description: '(Executivos)',
    color: '#d32f2f',
    icon: 'fa fa-arrow-circle-down',
    before_position_group_id: 2,
    after_position_group_id: 2,
    strict_to_position_group: 2,
    field_before_position: 'REQUIRED',
    field_after_position: 'REQUIRED',
    field_reason: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  {
    id: 13,
    controller_id: 4,
    name: 'Reintegração',
    timeline_title: 'Reintegrado(a)',
    description: '(Executivos)',
    color: '#3949ab',
    icon: 'fa fa-arrow-circle-o-right',
    allow_unregistered_users: true,
    after_position_group_id: 2,
    field_after_position: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  {
    id: 14,
    controller_id: 4,
    name: 'Licença',
    timeline_title: 'Solicitou Licença',
    description: '(Executivos)',
    color: '#3949ab',
    icon: 'fa fa-clock-o',
    strict_to_position_group: 2,
    field_reason: 'REQUIRED',
    field_notes: 'OPT',
    field_asked_by: 'OPT',
    field_absence_days: 'OPT'
  },
  {
    id: 15,
    controller_id: 4,
    name: 'Reserva',
    timeline_title: 'Solicitou Reserva',
    description: '(Oficiais)',
    color: '#8e24aa',
    icon: 'fa fa-calendar-o',
    strict_to_position_group: 1,
    field_reason: 'REQUIRED',
    field_notes: 'OPT',
    field_asked_by: 'OPT',
    field_absence_days: 'OPT'
  },
  {
    id: 16,
    controller_id: 4,
    name: 'Advertência',
    timeline_title: 'Advertido(a)',
    description: '(Executivos)',
    color: '#fb8c00',
    icon: 'fa fa-exclamation-triangle',
    strict_to_position_group: 2,
    field_reason: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  // --- TAG
  {
    id: 17,
    controller_id: 5,
    name: 'Solicitar Criação de TAG',
    timeline_title: 'Solicitou uma nova TAG',
    description: '(TAG)',
    color: '#3949ab',
    icon: 'fa fa-id-card-o',
    info_text:
      'Lembre-se que cada <strong>TAG é única</strong>, portanto, não podem haver repetições entre os policiais. Tenha ciência também que a TAG deve ser <strong>semelhante ao seu nick</strong>.',
    allow_multiple_users: false,
    field_notes: 'OPT',
    field_asked_by: 'OPT',
    field_tag: 'REQUIRED'
  },
  // --- GRATIFICAÇÕES
  {
    id: 18,
    controller_id: 6,
    name: 'Solicitar Gratificações Efetivas',
    timeline_title: 'Gratificado(a) com Medalhas Efetivas',
    description: '(Gratificações)',
    color: '#ffb300',
    icon: 'fa fa-trophy',
    info_text:
      'Se você deseja atribuir medalhas <strong>positivas</strong>, insira um <strong>número positivo</strong> (por exemplo, <samp>20</samp>). Se desejar, no entanto, atribuir medalhas <strong>negativas</strong>, insira um <strong>número negativo</strong> (por exemplo, <samp>-20</samp>).',
    field_reason: 'REQUIRED',
    field_notes: 'OPT',
    field_asked_by: 'OPT',
    field_bonuses: 'REQUIRED'
  },
  {
    id: 19,
    controller_id: 6,
    name: 'Solicitar Gratificações Temporárias',
    timeline_title: 'Gratificado(a) com Medalhas Negativas',
    description: '(Gratificações)',
    color: '#ffb300',
    icon: 'fa fa-trophy',
    info_text:
      'Se você deseja atribuir medalhas <strong>positivas</strong>, insira um <strong>número positivo</strong> (por exemplo, <samp>20</samp>). Se desejar, no entanto, atribuir medalhas <strong>negativas</strong>, insira um <strong>número negativo</strong> (por exemplo, <samp>-20</samp>).',
    field_reason: 'REQUIRED',
    field_notes: 'OPT',
    field_asked_by: 'OPT',
    field_bonuses: 'REQUIRED'
  },
  // --- DESLIGAMENTOS
  {
    id: 20,
    controller_id: 7,
    name: 'Solicitar um Desligamento Honroso',
    timeline_title: 'Desligou-se',
    description: '(Desligamentos)',
    color: '#4caf50',
    icon: 'fa fa-sign-out',
    field_before_position: 'REQUIRED',
    field_reason: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  {
    id: 21,
    controller_id: 7,
    name: 'Solicitar um Desligamento Desonroso',
    timeline_title: 'Desligado(a)',
    description: '(Desligamentos)',
    color: '#d32f2f',
    icon: 'fa fa-ban',
    field_before_position: 'REQUIRED',
    field_reason: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  // --- REFORMA
  {
    id: 22,
    controller_id: 8,
    name: 'Solicitar uma Reforma',
    timeline_title: 'Reformou-se',
    description: '(Reformas)',
    color: '#fb8c00',
    icon: 'fa fa-sign-out',
    field_before_position: 'REQUIRED',
    field_reason: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT'
  },
  // --- EXONERAÇÃO
  {
    id: 23,
    controller_id: 9,
    name: 'Solicitar uma Exoneração',
    timeline_title: 'Exonerado(a)',
    description: '(Exonerações)',
    color: '#d32f2f',
    icon: 'fa fa-ban',
    field_before_position: 'REQUIRED',
    field_reason: 'REQUIRED',
    field_permission: 'OPT',
    field_notes: 'OPT',
    field_asked_by: 'OPT',
    field_banned_days: 'REQUIRED'
  }
]
