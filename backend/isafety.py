import collections
from datetime import datetime
import json
from pickle import TRUE
from random import random, randrange

from bson.objectid import ObjectId
 


def get_database():
    
    import json
    

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://isafety:isafety@cluster0.ilaki.mongodb.net/db_isafety?retryWrites=true&w=majority"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['db_isafety']
    
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":    
    import numpy
    import pandas as pd
    from pandas import DataFrame
    from io import StringIO
    from dateutil import parser
    import time
   
    from random import randint
    # Get the database
    dbname = get_database()
    collectionName = dbname["saidas"]
    collectionAlgoritmo = dbname["pythons"]
    collectionHistorico = dbname["historico"]
    filter = {"name": "saidas"}    
    print('1 - MongoDB database connected - db_isafety:', dbname.list_collection_names(filter = filter))

    
    detailsOfCollection = collectionName.find()
    #print("2 - Listagem da coleção [saidas]: ", detailsOfCollection)
    
    #Felgueiras = collectionName.find_one({"LojaId" : "61b9e0649b47de47b764e8a9"})
    #Cacem = collectionName.find_one({"LojaId" : "61b9e0649b47de47b764e887"})
    #Bragança = collectionName.find_one({"LojaId" : "61b9e0649b47de47b764e8b2"})    
    idsLoja = ["61b9e0649b47de47b764e8a9","61b9e0649b47de47b764e887","61b9e0649b47de47b764e8b2"]
    
    #print("3 - Pesquisa por Id da Loja: \n", DataFrame(findById))
    
    for id_item in idsLoja:
        findById = dbname["saidas"].find_one({"LojaId" : ObjectId(id_item)})
        print("Id -> ", id_item)

        id = id_item
        timeStamp = time.time()
        cursor = collectionName.find_one({"LojaId" : ObjectId(id)})
        
        #Cálculo do risco de acidente geral
        dataFrame2Json = DataFrame(cursor['SaidaAlgoritmo'], index=cursor['SaidaAlgoritmo'])    
        x = dataFrame2Json['Acidente']
        print("\n5 - Nivel de risco de acidente 0-100%: ", numpy.mean(x)*100, '%\n')
        averageRisco = numpy.mean(x)*100


        #############################################################
        # TESTE - PARA CALCULO DAS SECÇÕES A IMPLEMENTAR NO ALGORITMO
        #############################################################

        # ARRAY DA SAÍDA DO ALGORITMO
        arraySaidaAlgoritmo = (cursor['SaidaAlgoritmo'])
        seccao = dataFrame2Json['Seccao']    
        grupoSeccao = dataFrame2Json.groupby(by=['Seccao', 'Acidente']).size().reset_index(name='Colaboradores')
        print("\n6 - Matriz de risco por secção\n")
        print(grupoSeccao)

        randomAlgoritmo = {'Acidente'}
        randomAlgoritmo = DataFrame(arraySaidaAlgoritmo).apply(lambda row: randint(0,1), axis=1)
        randomAcidente = DataFrame(randomAlgoritmo).assign(Acidente = lambda row: randomAlgoritmo)
        dfAlgoritmo = DataFrame(arraySaidaAlgoritmo)
        dfAlgoritmo['Acidente'] = randomAlgoritmo
        dataframeFinal = pd.concat([dfAlgoritmo, randomAcidente])
        print("dfAlgoritmo..............\n", dataframeFinal)
        grupoSeccaoRandom = dataframeFinal.groupby(by=['Seccao','Acidente']).size().reset_index(name='Colaboradores')
        print("Random Acidente :\n", grupoSeccaoRandom)

        y = dfAlgoritmo['Acidente']
        print("\nA - Nivel de risco de acidente DUMMY 0-100%: ", numpy.mean(y)*100, '%\n')
        averageRiscoRandom = numpy.mean(y)*100
    
      
        ###############################################
        #PREPARAÇÃO DO OBJETO A SER INSERIDO NA MONGODB
        ###############################################
        registo = json.loads(grupoSeccao.to_json(orient='records'))

        def replace_id(obj):
        # Replace mongodb _id parameter with an id parameter
            if obj.get('_id'):
                id = str(obj.get('_id'))
                del obj['_id']
                obj['id'] = id

            return obj
        
        ALGORITMO = {
            #"_id" : ObjectId(id),
            "resultado" : registo,
            "nivelRisco" : averageRisco,
            "timeStamp" : timeStamp
        }

        print("Objecto preparado: ", ALGORITMO)
        
        #collectionAlgoritmo.insert_one(ALGORITMO)

        elem = collectionAlgoritmo.find_one({'_id' : ObjectId(id)})
        if elem:
            print("\nAlgoritmo:    UPDATE\n")
            collectionAlgoritmo.find_one_and_update(
                {"_id": ObjectId(id)}, 
                {"$set": ALGORITMO})
            elem = collectionAlgoritmo.find_one({'_id': ObjectId(id)})
        else:
            print("\nAlgoritmo:    NOVO\n")
            ALGORITMO = {
            "_id" : ObjectId(id),
            "resultado" : registo,
            "nivelRisco" : averageRisco,
            "timeStamp" : timeStamp
            }
            collectionAlgoritmo.insert_one(ALGORITMO)
        
        #Inserção de dados no histórico de resultados
        collectionHistorico.insert_one(
            {
                "LojaId": ObjectId(id),
                "resultado" : registo,
                "nivelRisco" : averageRiscoRandom,
                "timeStamp" : timeStamp
                }
        )