import openpyxl
from django.core.management.base import BaseCommand
from drug.models import Drug

class Command(BaseCommand):
    help = 'Import data from Excel'

    def handle(self, *args, **options):
        wb = openpyxl.load_workbook('data.xlsx')
        sheet = wb.active

        for row in sheet.iter_rows(min_row=2, values_only=True):
            my_model = Drug()
            my_model.row = row[0]
            my_model.genericCode = row[1]
            my_model.brandCode = row[2]
            my_model.title = row[3]
            my_model.treatmentGroup = row[4]
            my_model.shape = row[5]
            my_model.dosage = row[6]
            my_model.price = row[7]
            my_model.percent = row[8]
            my_model.commitmentCondition = row[9]
            my_model.detail = row[10]


            # Set other fields accordingly
            my_model.save()