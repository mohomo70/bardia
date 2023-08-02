from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from drug.models import Drug
from drug.serializers import DrugSerializer
from rest_framework.decorators import api_view


@api_view(['GET'])
def drug_list(request):
    drugs = Drug.objects.all()
    drugs_serializer = DrugSerializer(drugs, many=True)
    return JsonResponse(drugs_serializer.data, safe=False)

@api_view(['GET'])
def drug_item(request):
    drug = request.drug
    drug_serializer = DrugSerializer(drug,many = False)
    return JsonResponse(drug_serializer.data)

@api_view(['POST'])
def add_drug(request):
    newDrug = request.data
    try:
        new_drug = Drug.objects.create(
            row = newDrug['row'],
            genericCode = newDrug['genericCode'],
            brandCode = newDrug['brandCode'],
            title = newDrug['title'],
            treatmentGroup = newDrug['treatmentGroup'],
            shape = newDrug['shape'],
            dosage = newDrug['dosage'],
            price = newDrug['price'],
            percent = newDrug['percent'],
            commitmentCondition = newDrug['commitmentCondition'],
            detail = newDrug['detail']
        )
        new_drug_serializer = DrugSerializer(new_drug,many=False)
        return JsonResponse(new_drug_serializer.data)
    except:
        message = {'error'}
        return JsonResponse(message,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
def update_drug(request, id):
    update_drug = Drug.objects.filter(id=id).first()
    if (update_drug) is None:
        response_data = {'response':'Drug does not exists'}
        return JsonResponse(response_data,status=status.HTTP_404_NOT_FOUND)
    
    row = request.data.get('row')
    genericCode = request.data.get('genericCode')
    brandCode = request.data.get('brandCode')
    title = request.data.get('title')
    treatmentGroup = request.data.get('treatmentGroup')
    shape = request.data.get('shape')
    dosage = request.data.get('dosage')
    price = request.data.get('price')
    percent = request.data.get('percent')
    commitmentCondition = request.data.get('commitmentCondition')
    detail = request.data.get('detail')

    update_drug.row = row
    update_drug.genericCode = genericCode
    update_drug.brandCode = brandCode
    update_drug.title = title
    update_drug.treatmentGroup = treatmentGroup
    update_drug.shape = shape
    update_drug.dosage = dosage
    update_drug.price = price
    update_drug.percent = percent
    update_drug.commitmentCondition = commitmentCondition
    update_drug.detail = detail

    update_drug.save()
    response_data = {'response':'item updated'}
    return JsonResponse(response_data,status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_drug(request, id):
    id = request.data.get('id')
    drug = Drug.objects.filter(id=id).first()
    if drug is None:
        response_data = {'response':'drug does not exists'}
        return JsonResponse(response_data,status=status.HTTP_404_NOT_FOUND)
    
    drug.delete()
    response_data = {'response':'drug Deleted'}
    return JsonResponse(response_data,status=status.HTTP_200_OK)