from django.urls import include, path
from drug import views 
 
urlpatterns = [ 
    path('', views.drug_list),
    path('<int:id>/',views.drug_item),
    path('create/',views.add_drug),
    path('update/<int:id>/',views.update_drug),
    path('delete/<int:id>/',views.delete_drug),
]