from django.shortcuts import render, redirect
from .forms import CourseForm
from django.contrib.auth.decorators import login_required
# Create your views here.
@login_required
def course_upload(request):
    if request.method == 'POST':
        form = CourseForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            # Redirect to a success page or back to the upload form
            return redirect('course_upload_success')
    else:
        form = CourseForm()
    return render(request, 'courses/upload.html', {'form': form})

def upload_success(request):
    return render(request, 'courses/success.html')
