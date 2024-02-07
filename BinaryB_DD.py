import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.feature_selection import SelectFromModel
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import tensorflow as tf
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn import tree



data = pd.read_csv("C:/Users/abaum/Documents/HPU/Research Data/ModifiedDatasheet.csv", na_values="199")


All = ['b_childlive'	,'b_income'	,'b_employ7'	,'b_employ10','b_peoplelive','b_trustdoctor','b_trusttrad','b_activitiesmoving'	
,'b_activitesclimb','b_problem15','b_healthpain','b_w23appetite','b_w23depress','b_w23effort','b_w23sleep','b_w23happy',
'b_w23lonely','b_w23unfriend','b_w23enjoy','b_w23sad','b_w23dislike','b_w23could','b_monthmoderate','b_oftensmoke',
'b_supporthelp','b_supportdoctor','b_supportprepare','b_supportdaily','b_supportgood','b_supportdeal',
'b_supportnderstand','b_supportwanted',"fam_alzheimer","fam_asthma","fam_depress","fam_diabetes","fam_heart","fam_bp","fam_chol",
"fam_osteoa","fam_predia","fam_ptsd","fam_stroke",'need_touch','Green_Q']
t = data[All]
#print(t.isnull().sum().to_string())
data.fillna(0, inplace=True)#Removes all row that have empty cells along with cells with 199
#print(t.describe)

features = ['b_childlive'	,'b_income'	,'b_employ7'	,'b_employ10','b_peoplelive','b_trustdoctor','b_trusttrad','b_activitiesmoving'	
,'b_activitesclimb','b_problem15','b_healthpain','b_w23appetite','b_w23depress','b_w23effort','b_w23sleep','b_w23happy',
'b_w23lonely','b_w23unfriend','b_w23enjoy','b_w23sad','b_w23dislike','b_w23could','b_monthmoderate','b_oftensmoke',
'b_supporthelp','b_supportdoctor','b_supportprepare','b_supportdaily','b_supportgood','b_supportdeal',
'b_supportnderstand','b_supportwanted',"fam_alzheimer","fam_asthma","fam_depress","fam_diabetes","fam_heart","fam_bp","fam_chol",
"fam_osteoa","fam_predia","fam_ptsd","fam_stroke",'Green_Q']

X = t[features]
y = t['need_touch']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1)

# Train Decision Tree model
decision_tree = DecisionTreeClassifier()
decision_tree.fit(X_train, y_train)

y_pred = decision_tree.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print('Decision Tree Accuracy: ', accuracy)

import graphviz
dot = tree.export_graphviz(decision_tree, out_file='BinaryB.dot', feature_names=features, class_names='need_touch',
                            filled=True)
graph = graphviz.Source(dot)
