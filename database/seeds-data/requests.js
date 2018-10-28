exports.controllers = [
  {
    id: 1,
    alias: 'SYS_METADATA',
    is_permanent: true,
    name: 'System Metadata',
    color: '#3399cc',
    is_crh: false
  },
  {
    id: 2,
    name: 'Soldados',
    color: '#663300'
  },
  {
    id: 3,
    name: 'Praças',
    color: '#2196f3'
  },
  {
    id: 4,
    name: 'Oficiais',
    color: '#000099'
  },
  {
    id: 5,
    name: 'Executivos',
    color: '#6600ff'
  },
  {
    id: 6,
    name: 'Tags',
    color: '#000000'
  },
  {
    id: 7,
    name: 'Gratificados',
    color: '#660000'
  },
  {
    id: 8,
    name: 'Desligados',
    color: '#000000'
  },
  {
    id: 9,
    name: 'Reformados',
    color: '#ff9933'
  },
  {
    id: 10,
    name: 'Exonerados',
    color: '#ff0000'
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
  // --- REGISTRO:
  {
    id: 1,
    alias: 'REGISTER',
    is_permanent: true,
    controller_id: 1,
    name: 'Criação da Conta',
    timeline_title: 'Criou a Conta',
    description: 'Evento de criação da conta no System.',
    color: '#3399cc',
    icon: 'fa fa-user-plus',
    allow_unregistered_users: true
  },
  // --- INSTRUÇÕES INICIAIS
  {
    id: 2,
    alias: 'CFSD_A',
    controller_id: 2,
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
    id: 3,
    alias: 'P_PRO',
    controller_id: 3,
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
    id: 4,
    alias: 'P_REB',
    controller_id: 3,
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
    id: 5,
    alias: 'P_REJOIN',
    controller_id: 3,
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
    id: 6,
    alias: 'O_PRO',
    controller_id: 4,
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
    id: 7,
    alias: 'O_REB',
    controller_id: 4,
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
    id: 8,
    alias: 'O_ABS',
    controller_id: 4,
    name: 'Solicitação de Licença',
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
    id: 9,
    alias: 'O_RES',
    controller_id: 4,
    name: 'Solicitação de Reserva',
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
    id: 10,
    alias: 'O_ADV',
    controller_id: 4,
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
    id: 11,
    alias: 'E_PRO',
    controller_id: 5,
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
    id: 12,
    alias: 'E_BUY_P',
    controller_id: 5,
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
    id: 13,
    alias: 'E_REB',
    controller_id: 5,
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
    id: 14,
    alias: 'E_REJOIN',
    controller_id: 5,
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
    id: 15,
    alias: 'E_ABS',
    controller_id: 5,
    name: 'Solicitação de Licença',
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
    id: 16,
    alias: 'E_RES',
    controller_id: 5,
    name: 'Solicitação de Reserva',
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
    id: 17,
    alias: 'E_ADV',
    controller_id: 5,
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
    id: 18,
    alias: 'TAG_REQUEST',
    controller_id: 6,
    name: 'Solicitação de Criação de TAG',
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
    id: 19,
    alias: 'GRAT_E',
    controller_id: 7,
    name: 'Atribuição de Gratificações Efetivas',
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
    id: 20,
    alias: 'GRAT_T',
    controller_id: 7,
    name: 'Atribuição de Gratificações Temporárias',
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
    id: 21,
    alias: 'DESL_H',
    controller_id: 8,
    name: 'Desligamento Honroso',
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
    id: 22,
    alias: 'DESL_D',
    controller_id: 8,
    name: 'Desligamento Desonroso',
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
    id: 23,
    alias: 'REF_REQUEST',
    controller_id: 9,
    name: 'Solicitação de Reforma',
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
    id: 24,
    alias: 'EXO_REQUEST',
    controller_id: 10,
    name: 'Exoneração',
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
