/* */
import expect from 'expect';
import reducers from '../../reducers';

describe('reducers', () => {
  it('should handle actions', () => {
    let state;
    state = reducers({rootReducer:{appointments_rdcer:{apposArrayProp:[{id:9,pet_id:5,owner_id:9,doctor_id:4,pet_name:'Wacky',owner_name:'Gonzalez, Robert',doc_name:'Mayer',date:'2016-05-23 00-17-27',reason:'fddfgdfg',reminder:true,active:true},{id:1,pet_id:1,owner_id:6,doctor_id:2,pet_name:'Babby',owner_name:'Hurtado, Manuel',doc_name:'Mayer',date:'2016-05-24 07-00-00',reason:'pain in leg',reminder:true,active:true},{id:5,pet_id:5,owner_id:10,doctor_id:2,pet_name:'Wacky',owner_name:'Marilian, Mariana',doc_name:'Mayer',date:'2016-05-26 07-00-00',reason:'Infection',reminder:true,active:true},{id:6,pet_id:6,owner_id:11,doctor_id:2,pet_name:'Omar',owner_name:'Lopez, Karla',doc_name:'Mayer',date:'2016-05-26 07-00-00',reason:'Infection',reminder:true,active:true},{id:4,pet_id:4,owner_id:9,doctor_id:2,pet_name:'Sally',owner_name:'Gonzalez, Robert',doc_name:'Mayer',date:'2016-05-26 07-00-00',reason:'Infection',reminder:true,active:true},{id:7,pet_id:7,owner_id:12,doctor_id:2,pet_name:'Lukas',owner_name:'Soho, Sucliff',doc_name:'Mayer',date:'2016-05-26 07-00-00',reason:'Infection',reminder:true,active:true},{id:8,pet_id:11,owner_id:13,doctor_id:2,pet_name:'Tama',owner_name:'Estrada, Luis',doc_name:'Mayer',date:'2016-05-26 07-00-00',reason:'Infection',reminder:true,active:true},{id:3,pet_id:3,owner_id:8,doctor_id:2,pet_name:'Max',owner_name:'McCarthy, Susan',doc_name:'Mayer',date:'2016-05-31 07-00-00',reason:'Vaccines',reminder:true,active:true},{id:2,pet_id:2,owner_id:7,doctor_id:3,pet_name:'Totopo',owner_name:'Soto, Mario',doc_name:'Salgado',date:'2016-06-01 07-00-00',reason:'Allergic itchy',reminder:true,active:true},{id:10,pet_id:1,owner_id:6,doctor_id:4,pet_name:'Babby',owner_name:'Hurtado, Manuel',doc_name:'Mayer',date:'2016-08-17 00-08-21',reason:'sdfdsfdsfdsfds',reminder:false,active:true},{id:11,pet_id:5,owner_id:10,doctor_id:4,pet_name:'Wacky',owner_name:'Marilian, Mariana',doc_name:'Mayer',date:'2016-08-17 00-08-43',reason:'RABIAAAAAA',reminder:false,active:true}]},appo_rdcer:{oneAppo:{appo:{id:4,pet_id:4,owner_id:9,doctor_id:2,pet_name:'Sally',owner_name:'Gonzalez, Robert',doc_name:'Mayer',date:'2016-05-26 07-00-00',reason:'Infection',reminder:true,active:true},owners:[{value:13,label:'Estrada Luis'},{value:9,label:'Gonzalez Robert'},{value:6,label:'Hurtado Manuel'},{value:14,label:'Jonas Carl'},{value:11,label:'Lopez Karla'},{value:10,label:'Marilian Mariana'},{value:8,label:'McCarthy Susan'},{value:12,label:'Soho Sucliff'},{value:7,label:'Soto Mario'}],docs:[{value:5,label:'Herrera Lalo'},{value:4,label:'Mayer Andrea'},{value:2,label:'Mayer Ric doctor'},{value:3,label:'Salgado Luis'}],pets:[{value:4,label:'Sally'}]},owners_options:[],doctors_options:[],pets_options:[],appo_arrays:{owners:[{value:13,label:'Estrada Luis'},{value:9,label:'Gonzalez Robert'},{value:6,label:'Hurtado Manuel'},{value:14,label:'Jonas Carl'},{value:11,label:'Lopez Karla'},{value:10,label:'Marilian Mariana'},{value:8,label:'McCarthy Susan'},{value:12,label:'Soho Sucliff'},{value:7,label:'Soto Mario'}],docs:[{value:5,label:'Herrera Lalo'},{value:4,label:'Mayer Andrea'},{value:2,label:'Mayer Ric doctor'},{value:3,label:'Salgado Luis'}]}}},routing:{locationBeforeTransitions:{pathname:'/appointment/4/',search:'',hash:'',state:null,action:'PUSH',key:'ty4mvx',query:{},$searchBase:{search:'',searchBase:''}}}}, {type:'SET_PETS',pets_options:[{value:4,label:'Sally'}]});
    
    expect(state.rootReducer.appo_rdcer.oneAppo.owners.length).toEqual(9);
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[0].value).toEqual(13);
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[0].label).toEqual('Estrada Luis');
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[1].value).toEqual(9);
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[1].label).toEqual('Gonzalez Robert');
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[2].value).toEqual(6);
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[2].label).toEqual('Hurtado Manuel');
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[3].value).toEqual(14);
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[3].label).toEqual('Jonas Carl');
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[4].value).toEqual(11);
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[4].label).toEqual('Lopez Karla');
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[5].value).toEqual(10);
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[5].label).toEqual('Marilian Mariana');
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[6].value).toEqual(8);
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[6].label).toEqual('McCarthy Susan');
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[7].value).toEqual(12);
    expect(state.rootReducer.appo_rdcer.oneAppo.owners[7].label).toEqual('Soho Sucliff');
    expect(state.rootReducer.appo_rdcer.oneAppo.docs.length).toEqual(4);
    expect(state.rootReducer.appo_rdcer.oneAppo.docs[0].value).toEqual(5);
    expect(state.rootReducer.appo_rdcer.oneAppo.docs[0].label).toEqual('Herrera Lalo');
    expect(state.rootReducer.appo_rdcer.oneAppo.docs[1].value).toEqual(4);
    expect(state.rootReducer.appo_rdcer.oneAppo.docs[1].label).toEqual('Mayer Andrea');
    expect(state.rootReducer.appo_rdcer.oneAppo.docs[2].value).toEqual(2);
    expect(state.rootReducer.appo_rdcer.oneAppo.docs[2].label).toEqual('Mayer Ric doctor');
    expect(state.rootReducer.appo_rdcer.pets_options.length).toEqual(1);
    expect(state.rootReducer.appo_rdcer.pets_options[0]).toEqual({value:4,label:'Sally'});
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners.length).toEqual(9);
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[0].value).toEqual(13);
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[0].label).toEqual('Estrada Luis');
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[1].value).toEqual(9);
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[1].label).toEqual('Gonzalez Robert');
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[2].value).toEqual(6);
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[2].label).toEqual('Hurtado Manuel');
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[3].value).toEqual(14);
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[3].label).toEqual('Jonas Carl');
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[4].value).toEqual(11);
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[4].label).toEqual('Lopez Karla');
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[5].value).toEqual(10);
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[5].label).toEqual('Marilian Mariana');
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[6].value).toEqual(8);
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[6].label).toEqual('McCarthy Susan');
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[7].value).toEqual(12);
    expect(state.rootReducer.appo_rdcer.appo_arrays.owners[7].label).toEqual('Soho Sucliff');
    expect(state.rootReducer.appo_rdcer.appo_arrays.docs.length).toEqual(4);
    expect(state.rootReducer.appo_rdcer.appo_arrays.docs[0].value).toEqual(5);
    expect(state.rootReducer.appo_rdcer.appo_arrays.docs[0].label).toEqual('Herrera Lalo');
    expect(state.rootReducer.appo_rdcer.appo_arrays.docs[1].value).toEqual(4);
    expect(state.rootReducer.appo_rdcer.appo_arrays.docs[1].label).toEqual('Mayer Andrea');
    expect(state.rootReducer.appo_rdcer.appo_arrays.docs[2].value).toEqual(2);
    expect(state.rootReducer.appo_rdcer.appo_arrays.docs[2].label).toEqual('Mayer Ric doctor');
  });
});

